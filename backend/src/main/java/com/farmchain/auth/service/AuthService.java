package com.farmchain.auth.service;

import com.farmchain.auth.dto.AuthDtos;
import com.farmchain.auth.entity.RefreshToken;
import com.farmchain.auth.entity.User;
import com.farmchain.auth.repository.RefreshTokenRepository;
import com.farmchain.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Value("${farmchain.jwt.refresh-token-expiry-days}")
    private int refreshTokenExpiryDays;

    @Transactional
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        User.Role role;
        try {
            role = User.Role.valueOf(request.role().toUpperCase());
            if (role == User.Role.ADMIN) {
                throw new IllegalArgumentException("Cannot self-register as ADMIN");
            }
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("ADMIN")) throw e;
            throw new IllegalArgumentException("Invalid role. Must be FARMER or BUYER");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(request.password()))
                .phone(request.phone())
                .role(role)
                .build();

        user = userRepository.save(user);
        return buildAuthResponse(user);
    }

    @Transactional
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        User user = userRepository.findByEmail(request.email().toLowerCase().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!user.isActive()) {
            throw new BadCredentialsException("Account is deactivated");
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return buildAuthResponse(user);
    }

    @Transactional
    public AuthDtos.AuthResponse refresh(AuthDtos.RefreshRequest request) {
        String tokenHash = passwordEncoder.encode(request.refreshToken());

        // Find by iterating — for MVP scale this is fine; at scale add a separate lookup field
        RefreshToken stored = refreshTokenRepository
                .findByTokenHash(hashToken(request.refreshToken()))
                .orElseThrow(() -> new BadCredentialsException("Invalid refresh token"));

        if (!stored.isValid()) {
            throw new BadCredentialsException("Refresh token is expired or revoked");
        }

        // Rotate: revoke old token, issue new one
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        return buildAuthResponse(stored.getUser());
    }

    // ── Helpers ─────────────────────────────────────────────────────────────

    private AuthDtos.AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        String rawRefreshToken = UUID.randomUUID().toString();

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .tokenHash(hashToken(rawRefreshToken))
                .expiresAt(Instant.now().plus(refreshTokenExpiryDays, ChronoUnit.DAYS))
                .build();
        refreshTokenRepository.save(refreshToken);

        return new AuthDtos.AuthResponse(
                accessToken,
                rawRefreshToken,
                "Bearer",
                jwtService.getAccessTokenExpiryMs() / 1000,
                new AuthDtos.UserInfo(
                        user.getId().toString(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole().name()
                )
        );
    }

    /**
     * Simple deterministic hash for refresh token lookup.
     * Using a fixed hash (not BCrypt) so we can look up by token hash directly.
     * BCrypt is non-deterministic — can't use it for lookup.
     */
    private String hashToken(String token) {
        try {
            var digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            var sb = new StringBuilder();
            for (byte b : hash) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash token", e);
        }
    }
}

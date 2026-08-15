package com.farmchain.auth.service;

import com.farmchain.auth.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long accessTokenExpiryMs;

    public JwtService(
            @Value("${farmchain.jwt.secret}") String secret,
            @Value("${farmchain.jwt.access-token-expiry-ms}") long accessTokenExpiryMs
    ) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiryMs = accessTokenExpiryMs;
    }

    /** Generate JWT access token for a user */
    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiryMs))
                .signWith(signingKey)
                .compact();
    }

    /** Validate token and return claims — returns null if invalid */
    public Claims validateAndGetClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    /** Extract user ID from token */
    public UUID extractUserId(String token) {
        Claims claims = validateAndGetClaims(token);
        if (claims == null) return null;
        return UUID.fromString(claims.getSubject());
    }

    public long getAccessTokenExpiryMs() {
        return accessTokenExpiryMs;
    }
}

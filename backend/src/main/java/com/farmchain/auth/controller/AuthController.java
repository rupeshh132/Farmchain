package com.farmchain.auth.controller;

import com.farmchain.auth.dto.AuthDtos;
import com.farmchain.auth.service.AuthService;
import com.farmchain.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/v1/auth/register
     * Register a new FARMER or BUYER account.
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthDtos.AuthResponse>> register(
            @Valid @RequestBody AuthDtos.RegisterRequest request
    ) {
        AuthDtos.AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
    }

    /**
     * POST /api/v1/auth/login
     * Login and receive access + refresh tokens.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDtos.AuthResponse>> login(
            @Valid @RequestBody AuthDtos.LoginRequest request
    ) {
        AuthDtos.AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    /**
     * POST /api/v1/auth/refresh
     * Exchange a valid refresh token for a new access token + rotated refresh token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthDtos.AuthResponse>> refresh(
            @Valid @RequestBody AuthDtos.RefreshRequest request
    ) {
        AuthDtos.AuthResponse response = authService.refresh(request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    /**
     * POST /api/v1/auth/firebase-login
     * Login using Firebase ID token (Google, Phone, Email)
     */
    @PostMapping("/firebase-login")
    public ResponseEntity<ApiResponse<AuthDtos.AuthResponse>> firebaseLogin(
            @Valid @RequestBody AuthDtos.FirebaseLoginRequest request
    ) {
        AuthDtos.AuthResponse response = authService.firebaseLogin(request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}

package com.farmchain.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    /** POST /api/v1/auth/register */
    public record RegisterRequest(
            @NotBlank(message = "Full name is required")
            @Size(min = 2, max = 255, message = "Full name must be between 2 and 255 characters")
            String fullName,

            @NotBlank(message = "Email is required")
            @Email(message = "Must be a valid email address")
            String email,

            @NotBlank(message = "Password is required")
            @Size(min = 8, message = "Password must be at least 8 characters")
            String password,

            String phone,

            @NotBlank(message = "Role is required")
            String role   // FARMER | BUYER
    ) {}

    /** POST /api/v1/auth/login */
    public record LoginRequest(
            @NotBlank(message = "Email is required")
            @Email(message = "Must be a valid email address")
            String email,

            @NotBlank(message = "Password is required")
            String password
    ) {}

    /** POST /api/v1/auth/refresh */
    public record RefreshRequest(
            @NotBlank(message = "Refresh token is required")
            String refreshToken
    ) {}

    /** Response for login + refresh */
    public record AuthResponse(
            String accessToken,
            String refreshToken,
            String tokenType,
            long expiresIn,     // access token expiry in seconds
            UserInfo user
    ) {}

    /** Basic user info returned in auth responses */
    public record UserInfo(
            String id,
            String fullName,
            String email,
            String role
    ) {}
}

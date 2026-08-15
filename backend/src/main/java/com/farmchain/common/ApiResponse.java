package com.farmchain.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;

/**
 * Standard API response envelope for all FarmChain endpoints.
 * Every response follows: { success, data, error, meta }
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        T data,
        ApiError error,
        Meta meta
) {
    public record ApiError(String code, String message, String field) {}
    public record Meta(Instant timestamp) {}

    /** Success response with data */
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, null, new Meta(Instant.now()));
    }

    /** Success response with no data body */
    public static ApiResponse<Void> ok() {
        return new ApiResponse<>(true, null, null, new Meta(Instant.now()));
    }

    /** Error response */
    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(false, null, new ApiError(code, message, null), new Meta(Instant.now()));
    }

    /** Validation error response with field name */
    public static <T> ApiResponse<T> validationError(String message, String field) {
        return new ApiResponse<>(false, null, new ApiError("VALIDATION_ERROR", message, field), new Meta(Instant.now()));
    }
}

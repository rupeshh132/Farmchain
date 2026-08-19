package com.farmchain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

public class UserDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserProfileResponse {
        private UUID id;
        private String email;
        private String fullName;
        private String phone;
        private String role;
        private String preferredLanguage;
        private String profilePhotoUrl;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PhotoUploadRequest {
        private String base64Image;
    }
}

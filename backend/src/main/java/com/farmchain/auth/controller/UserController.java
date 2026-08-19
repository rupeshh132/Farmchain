package com.farmchain.auth.controller;

import com.farmchain.auth.dto.UserDtos;
import com.farmchain.auth.service.UserService;
import com.farmchain.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDtos.UserProfileResponse>> getMe() {
        return ResponseEntity.ok(ApiResponse.ok(userService.getCurrentUserProfile()));
    }

    @PostMapping("/me/photo")
    public ResponseEntity<ApiResponse<UserDtos.UserProfileResponse>> uploadPhoto(
            @RequestBody UserDtos.PhotoUploadRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(userService.uploadProfilePhoto(request)));
    }
}

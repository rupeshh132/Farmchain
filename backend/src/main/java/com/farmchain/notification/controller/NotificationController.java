package com.farmchain.notification.controller;

import com.farmchain.auth.entity.User;
import com.farmchain.auth.repository.UserRepository;
import com.farmchain.common.ApiResponse;
import com.farmchain.notification.dto.NotificationDto;
import com.farmchain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getNotifications(
            @AuthenticationPrincipal User user) {
        
        return ResponseEntity.ok(ApiResponse.ok(notificationService.getUserNotifications(user.getId())));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {
        
        notificationService.markAsRead(id, user.getId());
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}

package com.farmchain.notification.service;

import com.farmchain.auth.entity.User;
import com.farmchain.notification.dto.NotificationDto;
import com.farmchain.notification.entity.Notification;
import com.farmchain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional
    public void createNotification(User user, String type, String message) {
        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .message(message)
                .build();
                
        notificationRepository.save(notification);
        
        // Mocking email dispatch
        log.info("📧 [MOCK EMAIL] To: {} | Subject: FarmChain Alert ({}) | Body: {}", 
                user.getEmail(), type, message);
    }

    public List<NotificationDto> getUserNotifications(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(n -> NotificationDto.builder()
                        .id(n.getId())
                        .type(n.getType())
                        .message(n.getMessage())
                        .isRead(n.getIsRead())
                        .createdAt(n.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(UUID notificationId, UUID userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
                
        if (!notification.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized to read this notification");
        }
        
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }
}

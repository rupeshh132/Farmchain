package com.farmchain.notification.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class NotificationDto {
    private UUID id;
    private String type;
    private String message;
    private Boolean isRead;
    private Instant createdAt;
}

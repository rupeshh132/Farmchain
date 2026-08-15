package com.farmchain.trace.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data
@Builder
public class TraceabilityEventDto {
    private String eventType;
    private String notes;
    private Instant occurredAt;
    private String actorName;
}

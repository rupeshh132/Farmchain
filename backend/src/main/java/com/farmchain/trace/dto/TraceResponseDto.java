package com.farmchain.trace.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
public class TraceResponseDto {
    private String qrCode;
    private String cropName;
    private BigDecimal quantityKg;
    private String farmState;
    private String farmDistrict;
    private Instant batchCreatedAt;
    private List<TraceabilityEventDto> events;
}

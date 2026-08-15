package com.farmchain.plan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YieldPredictionDto {
    private UUID id;
    private UUID planId;
    private BigDecimal predictedMinKg;
    private BigDecimal predictedMaxKg;
    private String modelVersion;
    private Instant predictedAt;
}

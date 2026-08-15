package com.farmchain.disease.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class DiseaseScanResponseDto {
    private UUID id;
    private String cropName;
    private String imageUrl;
    private String predictedDisease;
    private BigDecimal confidenceScore;
    private String recommendedAction;
    private Instant scannedAt;
}

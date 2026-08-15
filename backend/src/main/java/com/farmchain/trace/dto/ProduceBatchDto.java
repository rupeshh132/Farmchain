package com.farmchain.trace.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class ProduceBatchDto {
    private UUID id;
    private String cropName;
    private BigDecimal quantityKg;
    private String qrCode;
    private String status;
    private Instant createdAt;
}

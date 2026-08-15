package com.farmchain.finance.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class HarvestDto {
    private UUID id;
    private BigDecimal actualQuantityKg;
    private LocalDate harvestDate;
    private String qualityGrade;
}

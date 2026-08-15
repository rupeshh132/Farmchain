package com.farmchain.finance.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class HarvestRequestDto {
    private BigDecimal actualQuantityKg;
    private LocalDate harvestDate;
    private String qualityGrade;
}

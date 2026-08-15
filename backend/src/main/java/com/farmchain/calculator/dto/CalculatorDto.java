package com.farmchain.calculator.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class CalculatorDto {

    @Data
    @Builder
    public static class CalculatorResponse {
        private UUID farmId;
        private UUID cropId;
        private String cropName;
        private BigDecimal farmAreaHectare;
        private List<Requirement> requirements;
    }

    @Data
    @Builder
    public static class Requirement {
        private String knowledgeType; // SEED, FERTILIZER_N, etc.
        private BigDecimal perHectareValue;
        private BigDecimal totalRequiredValue;
        private String unit;
        private String sourceName;
        private String sourceUrl;
    }
}

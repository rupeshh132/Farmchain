package com.farmchain.farm.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
public class AnalyticsDto {
    private FinancialAnalytics financials;
    private TaskAnalytics tasks;
    private YieldAnalytics yield;

    @Data
    @Builder
    public static class FinancialAnalytics {
        private BigDecimal totalRevenue;
        private BigDecimal totalExpenses;
        private BigDecimal expectedProfit;
        private Map<String, BigDecimal> expensesByCategory;
    }

    @Data
    @Builder
    public static class TaskAnalytics {
        private int totalTasks;
        private int completedTasks;
        private int pendingTasks;
        private int delayedTasks;
        private double completionRate;
    }

    @Data
    @Builder
    public static class YieldAnalytics {
        private BigDecimal expectedYieldKg;
        private BigDecimal actualYieldKg;
    }
}

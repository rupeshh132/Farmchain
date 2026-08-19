package com.farmchain.farm.service;

import com.farmchain.farm.dto.AnalyticsDto;
import com.farmchain.finance.entity.Expense;
import com.farmchain.finance.entity.Harvest;
import com.farmchain.finance.repository.ExpenseRepository;
import com.farmchain.finance.repository.HarvestRepository;
import com.farmchain.plan.entity.FarmingPlan;
import com.farmchain.plan.entity.FarmingTask;
import com.farmchain.plan.repository.FarmingPlanRepository;
import com.farmchain.plan.repository.FarmingTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final FarmingPlanRepository planRepository;
    private final FarmingTaskRepository taskRepository;
    private final ExpenseRepository expenseRepository;
    private final HarvestRepository harvestRepository;

    @Transactional(readOnly = true)
    public AnalyticsDto getAnalytics(UUID farmId) {
        FarmingPlan activePlan = planRepository.findFirstByFarmIdAndStatusOrderByCreatedAtDesc(farmId, "ACTIVE")
                .orElse(null);

        if (activePlan == null) {
            return buildEmptyAnalytics();
        }

        UUID planId = activePlan.getId();

        // 1. Tasks
        List<FarmingTask> tasks = taskRepository.findByPlanIdOrderByDueDateAsc(planId);
        int totalTasks = tasks.size();
        int completedTasks = (int) tasks.stream().filter(FarmingTask::getIsCompleted).count();
        int pendingTasks = totalTasks - completedTasks;
        int delayedTasks = (int) tasks.stream()
                .filter(t -> !t.getIsCompleted() && t.getDueDate() != null && t.getDueDate().isBefore(LocalDate.now()))
                .count();
        double completionRate = totalTasks == 0 ? 0 : ((double) completedTasks / totalTasks) * 100;

        AnalyticsDto.TaskAnalytics taskAnalytics = AnalyticsDto.TaskAnalytics.builder()
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .delayedTasks(delayedTasks)
                .completionRate(completionRate)
                .build();

        // 2. Financials
        List<Expense> expenses = expenseRepository.findByPlanIdOrderByIncurredAtDesc(planId);
        BigDecimal totalExpenses = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> expensesByCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)
                ));

        // Note: For now, if there is no harvest, we assume 0 revenue. 
        // Or if we had market APIs, we could calculate expected. 
        // We'll keep it real based on logged harvests.
        List<Harvest> harvests = harvestRepository.findByPlanId(planId);
        
        // Let's assume a default market price of ₹2500 per Quintal (₹25 per kg) for demo if not saved
        // Real implementation would pull from mandi price.
        BigDecimal pricePerKg = new BigDecimal("25.00");
        
        BigDecimal actualYieldKg = harvests.stream()
                .map(Harvest::getActualQuantityKg)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalRevenue = actualYieldKg.multiply(pricePerKg);
        BigDecimal expectedProfit = totalRevenue.subtract(totalExpenses);

        AnalyticsDto.FinancialAnalytics financialAnalytics = AnalyticsDto.FinancialAnalytics.builder()
                .totalExpenses(totalExpenses)
                .totalRevenue(totalRevenue)
                .expectedProfit(expectedProfit)
                .expensesByCategory(expensesByCategory)
                .build();

        // 3. Yield
        // Mock expected yield based on farm size for demonstration of real vs expected
        BigDecimal expectedYieldKg = new BigDecimal("5000.00"); // 5 Tonnes

        AnalyticsDto.YieldAnalytics yieldAnalytics = AnalyticsDto.YieldAnalytics.builder()
                .expectedYieldKg(expectedYieldKg)
                .actualYieldKg(actualYieldKg)
                .build();

        return AnalyticsDto.builder()
                .tasks(taskAnalytics)
                .financials(financialAnalytics)
                .yield(yieldAnalytics)
                .build();
    }

    private AnalyticsDto buildEmptyAnalytics() {
        return AnalyticsDto.builder()
                .tasks(AnalyticsDto.TaskAnalytics.builder().build())
                .financials(AnalyticsDto.FinancialAnalytics.builder().build())
                .yield(AnalyticsDto.YieldAnalytics.builder().build())
                .build();
    }
}

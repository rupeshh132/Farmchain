package com.farmchain.finance.service;

import com.farmchain.finance.dto.ExpenseDto;
import com.farmchain.finance.dto.ExpenseRequestDto;
import com.farmchain.finance.dto.HarvestDto;
import com.farmchain.finance.dto.HarvestRequestDto;
import com.farmchain.finance.entity.Expense;
import com.farmchain.finance.entity.Harvest;
import com.farmchain.finance.repository.ExpenseRepository;
import com.farmchain.finance.repository.HarvestRepository;
import com.farmchain.plan.entity.FarmingPlan;
import com.farmchain.plan.repository.FarmingPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final ExpenseRepository expenseRepository;
    private final HarvestRepository harvestRepository;
    private final FarmingPlanRepository planRepository;

    @Transactional
    public ExpenseDto addExpense(UUID planId, ExpenseRequestDto request) {
        FarmingPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));

        Expense expense = Expense.builder()
                .plan(plan)
                .category(request.getCategory())
                .amount(request.getAmount())
                .incurredAt(request.getIncurredAt())
                .build();

        expense = expenseRepository.save(expense);

        return ExpenseDto.builder()
                .id(expense.getId())
                .category(expense.getCategory())
                .amount(expense.getAmount())
                .incurredAt(expense.getIncurredAt())
                .build();
    }

    public List<ExpenseDto> getExpensesByPlan(UUID planId) {
        return expenseRepository.findByPlanIdOrderByIncurredAtDesc(planId).stream()
                .map(e -> ExpenseDto.builder()
                        .id(e.getId())
                        .category(e.getCategory())
                        .amount(e.getAmount())
                        .incurredAt(e.getIncurredAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public HarvestDto logHarvest(UUID planId, HarvestRequestDto request) {
        FarmingPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));

        Harvest harvest = Harvest.builder()
                .plan(plan)
                .actualQuantityKg(request.getActualQuantityKg())
                .harvestDate(request.getHarvestDate())
                .qualityGrade(request.getQualityGrade())
                .build();

        harvest = harvestRepository.save(harvest);

        // Mark plan as HARVESTED
        plan.setStatus("HARVESTED");
        planRepository.save(plan);

        return HarvestDto.builder()
                .id(harvest.getId())
                .actualQuantityKg(harvest.getActualQuantityKg())
                .harvestDate(harvest.getHarvestDate())
                .qualityGrade(harvest.getQualityGrade())
                .build();
    }
}

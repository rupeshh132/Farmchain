package com.farmchain.finance.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.finance.dto.ExpenseDto;
import com.farmchain.finance.dto.ExpenseRequestDto;
import com.farmchain.finance.dto.HarvestDto;
import com.farmchain.finance.dto.HarvestRequestDto;
import com.farmchain.finance.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/plans/{planId}")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    @PostMapping("/expenses")
    public ResponseEntity<ApiResponse<ExpenseDto>> addExpense(@PathVariable UUID planId, @RequestBody ExpenseRequestDto request) {
        ExpenseDto expense = financeService.addExpense(planId, request);
        return ResponseEntity.ok(ApiResponse.ok(expense));
    }

    @GetMapping("/expenses")
    public ResponseEntity<ApiResponse<List<ExpenseDto>>> getExpenses(@PathVariable UUID planId) {
        List<ExpenseDto> expenses = financeService.getExpensesByPlan(planId);
        return ResponseEntity.ok(ApiResponse.ok(expenses));
    }

    @PostMapping("/harvests")
    public ResponseEntity<ApiResponse<HarvestDto>> logHarvest(@PathVariable UUID planId, @RequestBody HarvestRequestDto request) {
        HarvestDto harvest = financeService.logHarvest(planId, request);
        return ResponseEntity.ok(ApiResponse.ok(harvest));
    }
}

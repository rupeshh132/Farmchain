package com.farmchain.plan.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.plan.dto.FarmingPlanDto;
import com.farmchain.plan.dto.PlanCreateRequest;
import com.farmchain.plan.service.FarmingPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FarmingPlanController {

    private final FarmingPlanService planService;
    private final com.farmchain.auth.repository.UserRepository userRepository;
    private final com.farmchain.plan.service.YieldPredictionService yieldPredictionService;

    @PostMapping("/farms/{farmId}/plans")
    public ResponseEntity<ApiResponse<FarmingPlanDto>> createPlan(@PathVariable UUID farmId, @RequestBody PlanCreateRequest request) {
        FarmingPlanDto plan = planService.createPlan(farmId, request);
        return ResponseEntity.ok(ApiResponse.ok(plan));
    }

    @GetMapping("/farms/{farmId}/active-plan")
    public ResponseEntity<ApiResponse<FarmingPlanDto>> getActivePlan(@PathVariable UUID farmId) {
        FarmingPlanDto plan = planService.getActivePlan(farmId);
        return ResponseEntity.ok(ApiResponse.ok(plan));
    }

    @PutMapping("/tasks/{taskId}/complete")
    public ResponseEntity<ApiResponse<Void>> completeTask(@PathVariable UUID taskId) {
        planService.markTaskComplete(taskId);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    @GetMapping("/plans/{planId}/yield")
    public ResponseEntity<ApiResponse<com.farmchain.plan.dto.YieldPredictionDto>> getYieldPrediction(
            @PathVariable UUID planId) {
        
        com.farmchain.plan.dto.YieldPredictionDto dto = yieldPredictionService.getOrPredictYield(planId);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }
}

package com.farmchain.calculator.controller;

import com.farmchain.calculator.dto.CalculatorDto;
import com.farmchain.calculator.service.CalculatorService;
import com.farmchain.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms/{id}/calculator")
@RequiredArgsConstructor
public class CalculatorController {

    private final CalculatorService calculatorService;

    @GetMapping
    public ResponseEntity<ApiResponse<CalculatorDto.CalculatorResponse>> getCalculations(
            @PathVariable UUID id,
            @RequestParam UUID cropId) {
        
        CalculatorDto.CalculatorResponse response = calculatorService.calculateRequirements(id, cropId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}

package com.farmchain.farm.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.farm.dto.AnalyticsDto;
import com.farmchain.farm.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/{farmId}/analytics")
    public ResponseEntity<ApiResponse<AnalyticsDto>> getFarmAnalytics(@PathVariable UUID farmId) {
        AnalyticsDto analytics = analyticsService.getAnalytics(farmId);
        return ResponseEntity.ok(ApiResponse.ok(analytics));
    }
}

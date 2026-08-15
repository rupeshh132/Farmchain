package com.farmchain.trace.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.trace.dto.ProduceBatchDto;
import com.farmchain.trace.dto.TraceResponseDto;
import com.farmchain.trace.service.TraceabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TraceController {

    private final TraceabilityService traceService;

    @GetMapping("/farms/{farmId}/batches")
    public ResponseEntity<ApiResponse<List<ProduceBatchDto>>> getFarmBatches(@PathVariable UUID farmId) {
        return ResponseEntity.ok(ApiResponse.ok(traceService.getFarmBatches(farmId)));
    }

    // Public endpoint, needs to be allowed in SecurityConfig
    @GetMapping("/batches/{qrCode}/trace")
    public ResponseEntity<ApiResponse<TraceResponseDto>> getTrace(@PathVariable String qrCode) {
        return ResponseEntity.ok(ApiResponse.ok(traceService.getTraceByQrCode(qrCode)));
    }
}

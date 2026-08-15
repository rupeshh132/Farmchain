package com.farmchain.disease.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.disease.dto.DiseaseScanResponseDto;
import com.farmchain.disease.service.DiseaseDetectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/disease")
@RequiredArgsConstructor
public class DiseaseController {

    private final DiseaseDetectionService diseaseDetectionService;

    @PostMapping(value = "/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DiseaseScanResponseDto>> scanDisease(
            @RequestParam("farmId") UUID farmId,
            @RequestParam("cropId") UUID cropId,
            @RequestParam("file") MultipartFile file) {
        try {
            DiseaseScanResponseDto response = diseaseDetectionService.scanImage(farmId, cropId, file);
            return ResponseEntity.ok(ApiResponse.ok(response));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("FILE_ERROR", "Failed to process uploaded file"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error("ML_ERROR", e.getMessage()));
        }
    }

    @GetMapping("/farms/{farmId}/scans")
    public ResponseEntity<ApiResponse<List<DiseaseScanResponseDto>>> getScans(@PathVariable UUID farmId) {
        return ResponseEntity.ok(ApiResponse.ok(diseaseDetectionService.getScansByFarm(farmId)));
    }
}

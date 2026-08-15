package com.farmchain.crop.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.crop.dto.CropRecommendationDto;
import com.farmchain.crop.service.CropRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms/{id}/recommendations")
@RequiredArgsConstructor
public class CropRecommendationController {

    private final CropRecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CropRecommendationDto>>> getRecommendations(@PathVariable UUID id) {
        List<CropRecommendationDto> recommendations = recommendationService.getRecommendations(id);
        return ResponseEntity.ok(ApiResponse.ok(recommendations));
    }
}

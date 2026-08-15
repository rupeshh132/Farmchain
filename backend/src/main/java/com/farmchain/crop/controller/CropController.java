package com.farmchain.crop.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.repository.CropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/crops")
@RequiredArgsConstructor
public class CropController {

    private final CropRepository cropRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Crop>>> getAllCrops() {
        return ResponseEntity.ok(ApiResponse.ok(cropRepository.findAll()));
    }
}

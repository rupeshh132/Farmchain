package com.farmchain.farm.controller;

import com.farmchain.auth.entity.User;
import com.farmchain.auth.repository.UserRepository;
import com.farmchain.common.ApiResponse;
import com.farmchain.farm.dto.FarmDto;
import com.farmchain.farm.service.FarmService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;
    private final UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FarmDto.FarmResponse>> createFarm(@Valid @RequestBody FarmDto.CreateFarmRequest request) {
        User user = getAuthenticatedUser();
        FarmDto.FarmResponse response = farmService.createFarm(user, request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<FarmDto.FarmResponse>>> getMyFarms() {
        User user = getAuthenticatedUser();
        List<FarmDto.FarmResponse> response = farmService.getMyFarms(user);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/{id}/measurements")
    public ResponseEntity<ApiResponse<FarmDto.FarmResponse>> submitMeasurement(
            @PathVariable UUID id,
            @Valid @RequestBody FarmDto.SubmitMeasurementRequest request) {
        User user = getAuthenticatedUser();
        FarmDto.FarmResponse response = farmService.submitMeasurement(user, id, request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/{id}/soil")
    public ResponseEntity<ApiResponse<FarmDto.FarmResponse>> submitSoilProfile(
            @PathVariable UUID id,
            @Valid @RequestBody FarmDto.SubmitSoilProfileRequest request) {
        User user = getAuthenticatedUser();
        FarmDto.FarmResponse response = farmService.submitSoilProfile(user, id, request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}

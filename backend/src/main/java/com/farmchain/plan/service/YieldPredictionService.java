package com.farmchain.plan.service;

import com.farmchain.farm.entity.FarmMeasurement;
import com.farmchain.farm.repository.FarmMeasurementRepository;
import com.farmchain.plan.dto.YieldPredictionDto;
import com.farmchain.plan.entity.FarmingPlan;
import com.farmchain.plan.entity.YieldPrediction;
import com.farmchain.plan.repository.FarmingPlanRepository;
import com.farmchain.plan.repository.YieldPredictionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class YieldPredictionService {

    private final YieldPredictionRepository yieldPredictionRepository;
    private final FarmingPlanRepository planRepository;
    private final FarmMeasurementRepository measurementRepository;
    
    private final String ML_SERVICE_URL = "http://localhost:8000/predict/yield";
    private final RestTemplate restTemplate = new RestTemplate();

    @Transactional
    public YieldPredictionDto getOrPredictYield(UUID planId) {
        // 1. Check if prediction already exists and is recent (e.g., within a day)
        Optional<YieldPrediction> existingOpt = yieldPredictionRepository.findTopByPlanIdOrderByPredictedAtDesc(planId);
        if (existingOpt.isPresent()) {
            YieldPrediction existing = existingOpt.get();
            // Optional: Check if we should re-predict based on time. For now, just return existing if found.
            return mapToDto(existing);
        }

        // 2. Fetch Plan & Area
        FarmingPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Farming plan not found"));
                
        FarmMeasurement measurement = measurementRepository.findByFarmId(plan.getFarm().getId())
                .orElseThrow(() -> new IllegalArgumentException("Farm measurement not found"));
                
        BigDecimal areaHectare = measurement.getAreaHectare();
        String cropName = plan.getCrop().getName();

        // 3. Call ML Service
        BigDecimal minKg = BigDecimal.ZERO;
        BigDecimal maxKg = BigDecimal.ZERO;
        String modelVersion = "mock-v1";

        try {
            Map<String, Object> request = Map.of(
                "cropName", cropName,
                "areaHectares", areaHectare
            );
            
            ResponseEntity<Map> response = restTemplate.postForEntity(ML_SERVICE_URL, request, Map.class);
            Map<String, Object> result = response.getBody();
            
            if (result != null && Boolean.TRUE.equals(result.get("success"))) {
                minKg = BigDecimal.valueOf(((Number) result.get("predicted_min_kg")).doubleValue());
                maxKg = BigDecimal.valueOf(((Number) result.get("predicted_max_kg")).doubleValue());
                modelVersion = (String) result.get("model_version");
            } else {
                throw new RuntimeException("ML API failed");
            }
        } catch (Exception e) {
            log.warn("Failed to call ML Service for yield prediction. Using Java mock fallback.", e);
            // Fallback mock logic
            double baseYield = getMockBaseYield(cropName);
            double totalBase = baseYield * areaHectare.doubleValue();
            minKg = BigDecimal.valueOf(Math.round(totalBase * 0.85));
            maxKg = BigDecimal.valueOf(Math.round(totalBase * 1.15));
            modelVersion = "java-mock-fallback";
        }

        // 4. Save and return
        YieldPrediction prediction = YieldPrediction.builder()
                .plan(plan)
                .predictedMinKg(minKg)
                .predictedMaxKg(maxKg)
                .modelVersion(modelVersion)
                .predictedAt(Instant.now())
                .build();
                
        prediction = yieldPredictionRepository.save(prediction);
        
        return mapToDto(prediction);
    }
    
    private double getMockBaseYield(String cropName) {
        return switch (cropName) {
            case "Wheat" -> 3500;
            case "Rice" -> 4000;
            case "Sugarcane" -> 70000;
            case "Tomato" -> 25000;
            case "Potato" -> 22000;
            default -> 3000;
        };
    }

    private YieldPredictionDto mapToDto(YieldPrediction entity) {
        return YieldPredictionDto.builder()
                .id(entity.getId())
                .planId(entity.getPlan().getId())
                .predictedMinKg(entity.getPredictedMinKg())
                .predictedMaxKg(entity.getPredictedMaxKg())
                .modelVersion(entity.getModelVersion())
                .predictedAt(entity.getPredictedAt())
                .build();
    }
}

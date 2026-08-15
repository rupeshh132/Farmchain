package com.farmchain.farm.service;

import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.entity.FarmMeasurement;
import com.farmchain.farm.entity.SoilProfile;
import com.farmchain.farm.repository.FarmMeasurementRepository;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.farm.repository.SoilProfileRepository;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Read-model service for assembling the complete context of a farm.
 * Used by recommendation engines and calculators.
 */
@Service
@RequiredArgsConstructor
public class FarmContextService {

    private final FarmRepository farmRepository;
    private final FarmMeasurementRepository measurementRepository;
    private final SoilProfileRepository soilProfileRepository;

    @Data
    @Builder
    public static class FarmContext {
        private Farm farm;
        private FarmMeasurement measurements;
        private SoilProfile soilProfile;
        // In future sprints: Weather, CurrentPlan, History, etc.
    }

    public FarmContext getFarmContext(UUID farmId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new IllegalArgumentException("Farm not found"));

        FarmMeasurement measurement = measurementRepository.findByFarmId(farmId).orElse(null);
        SoilProfile soilProfile = soilProfileRepository.findByFarmId(farmId).orElse(null);

        return FarmContext.builder()
                .farm(farm)
                .measurements(measurement)
                .soilProfile(soilProfile)
                .build();
    }
}

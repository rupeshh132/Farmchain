package com.farmchain.calculator.service;

import com.farmchain.calculator.dto.CalculatorDto;
import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.repository.CropRepository;
import com.farmchain.farm.entity.FarmMeasurement;
import com.farmchain.farm.repository.FarmMeasurementRepository;
import com.farmchain.knowledge.entity.AgriculturalKnowledge;
import com.farmchain.knowledge.repository.AgriculturalKnowledgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalculatorService {

    private final FarmMeasurementRepository farmMeasurementRepository;
    private final CropRepository cropRepository;
    private final AgriculturalKnowledgeRepository knowledgeRepository;

    public CalculatorDto.CalculatorResponse calculateRequirements(UUID farmId, UUID cropId) {
        FarmMeasurement measurement = farmMeasurementRepository.findByFarmId(farmId)
                .orElseThrow(() -> new IllegalArgumentException("No measurement found for this farm."));

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new IllegalArgumentException("Crop not found."));

        BigDecimal areaHectare = measurement.getAreaHectare();

        List<AgriculturalKnowledge> knowledgeList = knowledgeRepository.findByCropId(cropId);

        List<CalculatorDto.Requirement> requirements = knowledgeList.stream()
                .map(k -> {
                    BigDecimal total = k.getPerHectareValue().multiply(areaHectare).setScale(2, RoundingMode.HALF_UP);
                    return CalculatorDto.Requirement.builder()
                            .knowledgeType(k.getKnowledgeType())
                            .perHectareValue(k.getPerHectareValue())
                            .totalRequiredValue(total)
                            .unit(k.getUnit())
                            .sourceName(k.getDataSource().getName())
                            .sourceUrl(k.getDataSource().getUrl())
                            .build();
                })
                .collect(Collectors.toList());

        return CalculatorDto.CalculatorResponse.builder()
                .farmId(farmId)
                .cropId(cropId)
                .cropName(crop.getName())
                .farmAreaHectare(areaHectare)
                .requirements(requirements)
                .build();
    }
}

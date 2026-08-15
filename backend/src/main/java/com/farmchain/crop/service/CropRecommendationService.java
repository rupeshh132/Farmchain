package com.farmchain.crop.service;

import com.farmchain.crop.dto.CropRecommendationDto;
import com.farmchain.crop.entity.CropVariety;
import com.farmchain.crop.repository.CropVarietyRepository;
import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.knowledge.entity.AgriculturalKnowledge;
import com.farmchain.knowledge.repository.AgriculturalKnowledgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CropRecommendationService {

    private final FarmRepository farmRepository;
    private final CropVarietyRepository cropVarietyRepository;
    private final AgriculturalKnowledgeRepository knowledgeRepository;

    public List<CropRecommendationDto> getRecommendations(UUID farmId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new IllegalArgumentException("Farm not found"));

        String currentSeason = determineSeason(LocalDate.now().getMonth());
        String farmState = farm.getState();

        List<CropVariety> allVarieties = cropVarietyRepository.findAll();
        List<CropRecommendationDto> recommendations = new ArrayList<>();

        for (CropVariety variety : allVarieties) {
            int score = 0;
            List<String> reasons = new ArrayList<>();

            // Rule 1: Region Suitability
            if (variety.getRegionSuitability() != null && variety.getRegionSuitability().contains(farmState)) {
                score += 50;
                reasons.add("✅ Highly suitable for " + farmState + " region");
            } else {
                reasons.add("⚠️ Not natively suitable for " + farmState);
            }

            // Rule 2: Season Matching (Check knowledge base)
            List<AgriculturalKnowledge> knowledgeList = knowledgeRepository.findByCropAndVariety(variety.getCrop(), variety);
            boolean seasonMatches = knowledgeList.stream()
                    .anyMatch(k -> currentSeason.equalsIgnoreCase(k.getSeason()));

            if (seasonMatches) {
                score += 50;
                reasons.add("✅ Current season (" + currentSeason + ") is optimal for sowing");
            } else {
                reasons.add("⚠️ Optimal sowing season is not " + currentSeason);
            }

            // Only recommend if score > 0
            if (score > 0) {
                recommendations.add(CropRecommendationDto.builder()
                        .cropId(variety.getCrop().getId())
                        .cropName(variety.getCrop().getName())
                        .varietyId(variety.getId())
                        .varietyName(variety.getVarietyName())
                        .suitabilityScore(score)
                        .matchReasons(reasons)
                        .build());
            }
        }

        // Sort by score descending
        return recommendations.stream()
                .sorted((a, b) -> Integer.compare(b.getSuitabilityScore(), a.getSuitabilityScore()))
                .collect(Collectors.toList());
    }

    private String determineSeason(Month currentMonth) {
        // Kharif: Jun, Jul, Aug, Sep, Oct
        // Rabi: Nov, Dec, Jan, Feb, Mar
        // Zaid: Apr, May
        switch (currentMonth) {
            case JUNE: case JULY: case AUGUST: case SEPTEMBER: case OCTOBER:
                return "KHARIF";
            case NOVEMBER: case DECEMBER: case JANUARY: case FEBRUARY: case MARCH:
                return "RABI";
            case APRIL: case MAY:
                return "ZAID";
            default:
                return "RABI";
        }
    }
}

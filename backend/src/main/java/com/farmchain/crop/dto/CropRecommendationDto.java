package com.farmchain.crop.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class CropRecommendationDto {
    private UUID cropId;
    private String cropName;
    private UUID varietyId;
    private String varietyName;
    private int suitabilityScore;
    private List<String> matchReasons;
}

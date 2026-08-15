package com.farmchain.plan.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class FarmingPlanDto {
    private UUID id;
    private String cropName;
    private String varietyName;
    private LocalDate sowingDate;
    private LocalDate expectedHarvestDate;
    private String status;
    private List<FarmingTaskDto> tasks;
}

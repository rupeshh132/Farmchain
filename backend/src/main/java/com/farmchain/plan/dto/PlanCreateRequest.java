package com.farmchain.plan.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class PlanCreateRequest {
    private UUID cropId;
    private UUID varietyId;
    private LocalDate sowingDate;
}

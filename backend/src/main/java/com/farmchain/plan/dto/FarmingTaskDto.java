package com.farmchain.plan.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class FarmingTaskDto {
    private UUID id;
    private String taskType;
    private String title;
    private LocalDate dueDate;
    private Boolean isCompleted;
}

package com.farmchain.plan.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateCustomTaskRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String notes;
    
    @NotNull(message = "Due date is required")
    private LocalDate dueDate;
}

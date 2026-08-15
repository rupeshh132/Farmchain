package com.farmchain.plan.service;

import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.entity.CropVariety;
import com.farmchain.crop.repository.CropRepository;
import com.farmchain.crop.repository.CropVarietyRepository;
import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.plan.dto.FarmingPlanDto;
import com.farmchain.plan.dto.FarmingTaskDto;
import com.farmchain.plan.dto.PlanCreateRequest;
import com.farmchain.plan.entity.FarmingPlan;
import com.farmchain.plan.entity.FarmingTask;
import com.farmchain.plan.repository.FarmingPlanRepository;
import com.farmchain.plan.repository.FarmingTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FarmingPlanService {

    private final FarmingPlanRepository planRepository;
    private final FarmingTaskRepository taskRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;
    private final CropVarietyRepository varietyRepository;

    @Transactional
    public FarmingPlanDto createPlan(UUID farmId, PlanCreateRequest request) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new IllegalArgumentException("Farm not found"));
        Crop crop = cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new IllegalArgumentException("Crop not found"));
        CropVariety variety = request.getVarietyId() != null 
                ? varietyRepository.findById(request.getVarietyId()).orElse(null) 
                : null;

        // Calculate expected harvest date
        int durationDays = (variety != null && variety.getDurationDays() != null) ? variety.getDurationDays() : 120;
        LocalDate harvestDate = request.getSowingDate().plusDays(durationDays);

        FarmingPlan plan = FarmingPlan.builder()
                .farm(farm)
                .crop(crop)
                .variety(variety)
                .sowingDate(request.getSowingDate())
                .expectedHarvestDate(harvestDate)
                .build();
        
        plan = planRepository.save(plan);

        // Generate baseline tasks
        FarmingTask sowingTask = FarmingTask.builder()
                .plan(plan)
                .taskType("SOWING")
                .title("Sow " + crop.getName())
                .dueDate(request.getSowingDate())
                .build();

        FarmingTask fertilizerTask = FarmingTask.builder()
                .plan(plan)
                .taskType("FERTILIZER")
                .title("Apply first top-dressing")
                .dueDate(request.getSowingDate().plusDays(30))
                .build();

        FarmingTask harvestTask = FarmingTask.builder()
                .plan(plan)
                .taskType("HARVEST")
                .title("Harvest " + crop.getName())
                .dueDate(harvestDate)
                .build();

        taskRepository.saveAll(List.of(sowingTask, fertilizerTask, harvestTask));

        return getActivePlan(farmId);
    }

    public FarmingPlanDto getActivePlan(UUID farmId) {
        return planRepository.findFirstByFarmIdAndStatusOrderByCreatedAtDesc(farmId, "ACTIVE")
                .map(plan -> {
                    List<FarmingTaskDto> tasks = taskRepository.findByPlanIdOrderByDueDateAsc(plan.getId())
                            .stream()
                            .map(t -> FarmingTaskDto.builder()
                                    .id(t.getId())
                                    .taskType(t.getTaskType())
                                    .title(t.getTitle())
                                    .dueDate(t.getDueDate())
                                    .isCompleted(t.getIsCompleted())
                                    .build())
                            .collect(Collectors.toList());

                    return FarmingPlanDto.builder()
                            .id(plan.getId())
                            .cropId(plan.getCrop().getId())
                            .cropName(plan.getCrop().getName())
                            .varietyName(plan.getVariety() != null ? plan.getVariety().getVarietyName() : null)
                            .sowingDate(plan.getSowingDate())
                            .expectedHarvestDate(plan.getExpectedHarvestDate())
                            .status(plan.getStatus())
                            .tasks(tasks)
                            .build();
                }).orElse(null);
    }

    @Transactional
    public void markTaskComplete(UUID taskId) {
        FarmingTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setIsCompleted(true);
        taskRepository.save(task);
    }
}

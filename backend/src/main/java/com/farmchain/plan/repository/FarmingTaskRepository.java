package com.farmchain.plan.repository;

import com.farmchain.plan.entity.FarmingTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FarmingTaskRepository extends JpaRepository<FarmingTask, UUID> {
    List<FarmingTask> findByPlanIdOrderByDueDateAsc(UUID planId);
}

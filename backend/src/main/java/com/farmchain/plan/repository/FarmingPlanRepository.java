package com.farmchain.plan.repository;

import com.farmchain.plan.entity.FarmingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmingPlanRepository extends JpaRepository<FarmingPlan, UUID> {
    Optional<FarmingPlan> findFirstByFarmIdAndStatusOrderByCreatedAtDesc(UUID farmId, String status);
}

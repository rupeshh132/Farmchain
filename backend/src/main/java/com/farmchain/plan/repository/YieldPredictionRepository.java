package com.farmchain.plan.repository;

import com.farmchain.plan.entity.YieldPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface YieldPredictionRepository extends JpaRepository<YieldPrediction, UUID> {
    Optional<YieldPrediction> findTopByPlanIdOrderByPredictedAtDesc(UUID planId);
}

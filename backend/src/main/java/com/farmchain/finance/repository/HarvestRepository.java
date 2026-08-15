package com.farmchain.finance.repository;

import com.farmchain.finance.entity.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HarvestRepository extends JpaRepository<Harvest, UUID> {
    List<Harvest> findByPlanId(UUID planId);
}

package com.farmchain.farm.repository;

import com.farmchain.farm.entity.FarmMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmMeasurementRepository extends JpaRepository<FarmMeasurement, UUID> {
    Optional<FarmMeasurement> findByFarmId(UUID farmId);
}

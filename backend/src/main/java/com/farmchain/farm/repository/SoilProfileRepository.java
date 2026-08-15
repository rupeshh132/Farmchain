package com.farmchain.farm.repository;

import com.farmchain.farm.entity.SoilProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SoilProfileRepository extends JpaRepository<SoilProfile, UUID> {
    Optional<SoilProfile> findByFarmId(UUID farmId);
}

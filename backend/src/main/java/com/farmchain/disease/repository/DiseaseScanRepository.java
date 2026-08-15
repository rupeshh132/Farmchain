package com.farmchain.disease.repository;

import com.farmchain.disease.entity.DiseaseScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DiseaseScanRepository extends JpaRepository<DiseaseScan, UUID> {
    List<DiseaseScan> findByFarmIdOrderByScannedAtDesc(UUID farmId);
}

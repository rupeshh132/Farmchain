package com.farmchain.crop.repository;

import com.farmchain.crop.entity.CropVariety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CropVarietyRepository extends JpaRepository<CropVariety, UUID> {
    List<CropVariety> findByCropId(UUID cropId);
}

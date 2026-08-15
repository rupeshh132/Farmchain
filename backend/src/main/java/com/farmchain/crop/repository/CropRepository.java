package com.farmchain.crop.repository;

import com.farmchain.crop.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CropRepository extends JpaRepository<Crop, UUID> {
}

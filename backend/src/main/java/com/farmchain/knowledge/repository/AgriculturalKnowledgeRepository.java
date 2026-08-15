package com.farmchain.knowledge.repository;

import com.farmchain.knowledge.entity.AgriculturalKnowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AgriculturalKnowledgeRepository extends JpaRepository<AgriculturalKnowledge, UUID> {
    List<AgriculturalKnowledge> findByCropId(UUID cropId);
    List<AgriculturalKnowledge> findByVarietyId(UUID varietyId);
    List<AgriculturalKnowledge> findByCropAndVariety(com.farmchain.crop.entity.Crop crop, com.farmchain.crop.entity.CropVariety variety);
}

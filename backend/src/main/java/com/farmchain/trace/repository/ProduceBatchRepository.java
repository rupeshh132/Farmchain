package com.farmchain.trace.repository;

import com.farmchain.trace.entity.ProduceBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProduceBatchRepository extends JpaRepository<ProduceBatch, UUID> {
    List<ProduceBatch> findByFarmIdOrderByCreatedAtDesc(UUID farmId);
    Optional<ProduceBatch> findByQrCode(String qrCode);
}

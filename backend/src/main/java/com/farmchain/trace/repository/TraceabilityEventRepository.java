package com.farmchain.trace.repository;

import com.farmchain.trace.entity.TraceabilityEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TraceabilityEventRepository extends JpaRepository<TraceabilityEvent, UUID> {
    List<TraceabilityEvent> findByBatchIdOrderByOccurredAtDesc(UUID batchId);
}

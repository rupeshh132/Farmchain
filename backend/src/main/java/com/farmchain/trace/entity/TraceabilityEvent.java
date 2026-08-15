package com.farmchain.trace.entity;

import com.farmchain.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "traceability_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TraceabilityEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private ProduceBatch batch;

    @Column(name = "event_type", length = 50)
    private String eventType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actor_id")
    private User actor;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "occurred_at", updatable = false)
    @Builder.Default
    private Instant occurredAt = Instant.now();
}

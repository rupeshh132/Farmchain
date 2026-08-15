package com.farmchain.plan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "yield_predictions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YieldPrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private FarmingPlan plan;

    @Column(name = "predicted_min_kg")
    private BigDecimal predictedMinKg;

    @Column(name = "predicted_max_kg")
    private BigDecimal predictedMaxKg;

    @Column(name = "model_version")
    @Builder.Default
    private String modelVersion = "mock-v1";

    @Column(name = "predicted_at", updatable = false)
    @Builder.Default
    private Instant predictedAt = Instant.now();
}

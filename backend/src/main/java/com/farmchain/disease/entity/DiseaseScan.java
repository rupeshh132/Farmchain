package com.farmchain.disease.entity;

import com.farmchain.crop.entity.Crop;
import com.farmchain.farm.entity.Farm;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "disease_scans")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiseaseScan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "predicted_disease", nullable = false, length = 100)
    private String predictedDisease;

    @Column(name = "confidence_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal confidenceScore;

    @Column(name = "recommended_action", columnDefinition = "TEXT")
    private String recommendedAction;

    @Column(name = "scanned_at", updatable = false)
    @Builder.Default
    private Instant scannedAt = Instant.now();
}

package com.farmchain.trace.entity;

import com.farmchain.crop.entity.Crop;
import com.farmchain.farm.entity.Farm;
import com.farmchain.finance.entity.Harvest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "produce_batches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProduceBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "harvest_id")
    private Harvest harvest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(name = "quantity_kg", precision = 12, scale = 2)
    private BigDecimal quantityKg;

    @Column(name = "qr_code", nullable = false, unique = true)
    private String qrCode;

    @Column(length = 20)
    @Builder.Default
    private String status = "CREATED";

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}

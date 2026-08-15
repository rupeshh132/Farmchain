package com.farmchain.farm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "soil_profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SoilProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    @Column(name = "soil_type")
    private String soilType;

    @Column(name = "ph_value", precision = 3, scale = 1)
    private BigDecimal phValue;

    @Column(name = "nitrogen_level")
    private String nitrogenLevel;

    @Column(name = "phosphorus_level")
    private String phosphorusLevel;

    @Column(name = "potassium_level")
    private String potassiumLevel;

    @Column(name = "irrigation_available")
    private Boolean irrigationAvailable;

    @Column(name = "water_source")
    private String waterSource;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}

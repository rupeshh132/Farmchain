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
@Table(name = "farm_measurements")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FarmMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    @Column(name = "length_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal lengthValue;

    @Column(name = "width_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal widthValue;

    @Column(name = "input_unit", nullable = false)
    private String inputUnit; // 'feet' or 'meter'

    @Column(name = "area_sqft", nullable = false, precision = 14, scale = 2)
    private BigDecimal areaSqft;

    @Column(name = "area_sqm", nullable = false, precision = 14, scale = 2)
    private BigDecimal areaSqm;

    @Column(name = "area_acre", nullable = false, precision = 10, scale = 4)
    private BigDecimal areaAcre;

    @Column(name = "area_hectare", nullable = false, precision = 10, scale = 4)
    private BigDecimal areaHectare;

    @Column(name = "area_bigha", precision = 10, scale = 4)
    private BigDecimal areaBigha;

    @Column(name = "bigha_state_variant")
    private String bighaStateVariant;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}

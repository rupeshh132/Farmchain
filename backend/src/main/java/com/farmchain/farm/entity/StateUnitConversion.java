package com.farmchain.farm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "state_unit_conversions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StateUnitConversion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String state;

    @Column(name = "variant_name", nullable = false)
    private String variantName;

    @Column(name = "sqft_per_unit", nullable = false, precision = 10, scale = 4)
    private BigDecimal sqftPerUnit;

    private String note;
}

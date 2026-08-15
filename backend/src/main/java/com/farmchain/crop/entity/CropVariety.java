package com.farmchain.crop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "crop_varieties")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CropVariety {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(name = "variety_name", nullable = false)
    private String varietyName;

    @Column(name = "duration_days")
    private Integer durationDays;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "region_suitability")
    private List<String> regionSuitability;
}

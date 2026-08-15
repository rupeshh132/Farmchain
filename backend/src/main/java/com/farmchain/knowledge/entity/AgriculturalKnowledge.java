package com.farmchain.knowledge.entity;

import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.entity.CropVariety;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "agricultural_knowledge")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgriculturalKnowledge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variety_id")
    private CropVariety variety;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "data_source_id", nullable = false)
    private DataSource dataSource;

    private String region;

    private String season;

    @Column(name = "knowledge_type", nullable = false)
    private String knowledgeType;

    @Column(name = "per_hectare_value", nullable = false, precision = 12, scale = 3)
    private BigDecimal perHectareValue;

    @Column(nullable = false)
    private String unit;

    @Column(name = "published_date")
    private LocalDate publishedDate;

    @Column(name = "confidence_level")
    @Builder.Default
    private String confidenceLevel = "OFFICIAL";

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();
}

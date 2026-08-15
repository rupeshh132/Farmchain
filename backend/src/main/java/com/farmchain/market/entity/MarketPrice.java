package com.farmchain.market.entity;

import com.farmchain.crop.entity.Crop;
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
@Table(name = "market_prices")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "market_id", nullable = false)
    private Market market;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(name = "min_price", precision = 10, scale = 2)
    private BigDecimal minPrice;

    @Column(name = "max_price", precision = 10, scale = 2)
    private BigDecimal maxPrice;

    @Column(name = "modal_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal modalPrice;

    @Column(name = "price_date", nullable = false)
    private LocalDate priceDate;

    @Column(nullable = false, length = 50)
    private String source;

    @Column(name = "ingested_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant ingestedAt = Instant.now();
}

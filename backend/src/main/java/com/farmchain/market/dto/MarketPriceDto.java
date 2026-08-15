package com.farmchain.market.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class MarketPriceDto {
    private String marketName;
    private String state;
    private String district;
    private String cropName;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal modalPrice;
    private LocalDate priceDate;
    private String source;
}

package com.farmchain.market.service;

import com.farmchain.market.dto.MarketPriceDto;
import com.farmchain.market.entity.MarketPrice;
import com.farmchain.market.repository.MarketPriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MarketPriceService {

    private final MarketPriceRepository marketPriceRepository;

    public MarketPriceDto getLatestPrice(UUID cropId, String state) {
        List<MarketPrice> prices = marketPriceRepository.findLatestByCropAndState(cropId, state);
        if (prices.isEmpty()) {
            return null;
        }

        MarketPrice latest = prices.get(0);
        return MarketPriceDto.builder()
                .marketName(latest.getMarket().getName())
                .state(latest.getMarket().getState())
                .district(latest.getMarket().getDistrict())
                .cropName(latest.getCrop().getName())
                .minPrice(latest.getMinPrice())
                .maxPrice(latest.getMaxPrice())
                .modalPrice(latest.getModalPrice())
                .priceDate(latest.getPriceDate())
                .source(latest.getSource())
                .build();
    }
}

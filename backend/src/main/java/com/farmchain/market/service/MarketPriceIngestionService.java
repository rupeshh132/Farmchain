package com.farmchain.market.service;

import com.farmchain.crop.entity.Crop;
import com.farmchain.crop.repository.CropRepository;
import com.farmchain.market.entity.Market;
import com.farmchain.market.entity.MarketPrice;
import com.farmchain.market.repository.MarketPriceRepository;
import com.farmchain.market.repository.MarketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class MarketPriceIngestionService {

    private final MarketRepository marketRepository;
    private final MarketPriceRepository marketPriceRepository;
    private final CropRepository cropRepository;
    private final Random random = new Random();

    /**
     * Runs daily at 6 AM.
     * For now, this is a simulated ingestion job that generates realistic prices.
     */
    @Scheduled(cron = "0 0 6 * * ?")
    @Transactional
    public void ingestPrices() {
        log.info("Starting market price ingestion job...");
        List<Market> markets = marketRepository.findAll();
        List<Crop> crops = cropRepository.findAll();

        if (markets.isEmpty() || crops.isEmpty()) {
            log.warn("No markets or crops found. Skipping ingestion.");
            return;
        }

        LocalDate today = LocalDate.now();

        for (Market market : markets) {
            for (Crop crop : crops) {
                // Generate a realistic modal price based on some base values
                BigDecimal basePrice = getBasePriceForCrop(crop.getName());
                // Add some random fluctuation (-5% to +5%)
                double fluctuation = 0.95 + (1.05 - 0.95) * random.nextDouble();
                BigDecimal modalPrice = basePrice.multiply(BigDecimal.valueOf(fluctuation));
                
                BigDecimal minPrice = modalPrice.multiply(BigDecimal.valueOf(0.90));
                BigDecimal maxPrice = modalPrice.multiply(BigDecimal.valueOf(1.10));

                MarketPrice marketPrice = MarketPrice.builder()
                        .market(market)
                        .crop(crop)
                        .minPrice(minPrice)
                        .maxPrice(maxPrice)
                        .modalPrice(modalPrice)
                        .priceDate(today)
                        .source("Agmarknet (Simulated)")
                        .build();

                marketPriceRepository.save(marketPrice);
            }
        }
        log.info("Completed market price ingestion job.");
    }

    private BigDecimal getBasePriceForCrop(String cropName) {
        return switch (cropName.toLowerCase()) {
            case "wheat" -> new BigDecimal("2450.00");
            case "rice" -> new BigDecimal("2800.00");
            case "maize" -> new BigDecimal("1900.00");
            case "mustard" -> new BigDecimal("5500.00");
            default -> new BigDecimal("3000.00");
        };
    }
}

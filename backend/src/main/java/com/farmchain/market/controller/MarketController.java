package com.farmchain.market.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.market.dto.MarketPriceDto;
import com.farmchain.market.service.MarketPriceIngestionService;
import com.farmchain.market.service.MarketPriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/markets")
@RequiredArgsConstructor
public class MarketController {

    private final MarketPriceService marketPriceService;
    private final MarketPriceIngestionService ingestionService;

    @GetMapping("/prices/latest")
    public ResponseEntity<ApiResponse<MarketPriceDto>> getLatestPrice(
            @RequestParam UUID cropId, 
            @RequestParam String state) {
        
        MarketPriceDto price = marketPriceService.getLatestPrice(cropId, state);
        return ResponseEntity.ok(ApiResponse.ok(price));
    }

    @PostMapping("/ingest")
    public ResponseEntity<ApiResponse<String>> triggerIngestion() {
        ingestionService.ingestPrices();
        return ResponseEntity.ok(ApiResponse.ok("Ingestion triggered successfully"));
    }
}

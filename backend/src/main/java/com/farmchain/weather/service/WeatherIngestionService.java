package com.farmchain.weather.service;

import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.weather.dto.OpenMeteoResponse;
import com.farmchain.weather.entity.WeatherData;
import com.farmchain.weather.repository.WeatherDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeatherIngestionService {

    private final FarmRepository farmRepository;
    private final WeatherDataRepository weatherDataRepository;
    private final WeatherRuleEngine weatherRuleEngine;
    private final RestTemplate restTemplate;

    // Run every 3 hours: 0 0 */3 * * *
    @Scheduled(cron = "0 0 */3 * * *")
    public void ingestWeatherData() {
        log.info("Starting scheduled weather data ingestion...");
        List<Farm> farms = farmRepository.findAll();
        
        // For MVP, loop over all farms. In prod, group by unique lat/lon rounded to 2 decimals
        for (Farm farm : farms) {
            if (farm.getLatitude() == null || farm.getLongitude() == null) continue;
            
            try {
                fetchAndSaveForFarm(farm);
            } catch (Exception e) {
                log.error("Failed to fetch weather for farm {}: {}", farm.getId(), e.getMessage());
            }
        }
        log.info("Weather ingestion completed.");
    }

    public void fetchAndSaveForFarm(Farm farm) {
        String url = String.format("https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s&daily=temperature_2m_max,relative_humidity_2m_mean,precipitation_sum,wind_speed_10m_max&timezone=auto", 
                farm.getLatitude(), farm.getLongitude());
        
        OpenMeteoResponse response = restTemplate.getForObject(url, OpenMeteoResponse.class);
        if (response != null && response.getDaily() != null) {
            OpenMeteoResponse.Daily daily = response.getDaily();
            
            for (int i = 0; i < daily.getTime().size(); i++) {
                LocalDate date = LocalDate.parse(daily.getTime().get(i));
                BigDecimal temp = daily.getTemperature2mMax().get(i);
                BigDecimal humidity = daily.getRelativeHumidity2mMean().get(i);
                BigDecimal rain = daily.getPrecipitationSum().get(i);
                BigDecimal wind = daily.getWindSpeed10mMax().get(i);
                
                Optional<WeatherData> existing = weatherDataRepository.findByLatitudeAndLongitudeAndForecastDate(
                        farm.getLatitude(), farm.getLongitude(), date
                );
                
                WeatherData data = existing.orElseGet(() -> WeatherData.builder()
                        .latitude(farm.getLatitude())
                        .longitude(farm.getLongitude())
                        .forecastDate(date)
                        .source("Open-Meteo")
                        .build());
                        
                data.setTemperatureC(temp);
                data.setHumidityPct(humidity);
                data.setRainfallMm(rain);
                data.setWindKmph(wind);
                
                weatherDataRepository.save(data);
                
                // Only run alerts for today's or tomorrow's forecast
                if (date.isEqual(LocalDate.now()) || date.isEqual(LocalDate.now().plusDays(1))) {
                    weatherRuleEngine.evaluateRules(farm, data);
                }
            }
        }
    }
}

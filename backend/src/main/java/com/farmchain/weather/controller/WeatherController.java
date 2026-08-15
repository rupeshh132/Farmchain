package com.farmchain.weather.controller;

import com.farmchain.common.ApiResponse;
import com.farmchain.farm.entity.Farm;
import com.farmchain.farm.repository.FarmRepository;
import com.farmchain.weather.dto.WeatherDto;
import com.farmchain.weather.entity.WeatherAlert;
import com.farmchain.weather.entity.WeatherData;
import com.farmchain.weather.repository.WeatherAlertRepository;
import com.farmchain.weather.repository.WeatherDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/farms/{id}")
@RequiredArgsConstructor
public class WeatherController {

    private final FarmRepository farmRepository;
    private final WeatherDataRepository weatherDataRepository;
    private final WeatherAlertRepository weatherAlertRepository;

    @GetMapping("/weather")
    public ResponseEntity<ApiResponse<WeatherDto.DashboardWeatherResponse>> getFarmWeather(@PathVariable UUID id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Farm not found."));

        // Get today's weather
        Optional<WeatherData> todayWeather = weatherDataRepository.findByLatitudeAndLongitudeAndForecastDate(
                farm.getLatitude(), farm.getLongitude(), LocalDate.now()
        );

        List<WeatherDto.WeatherSummary> forecast = todayWeather.stream()
                .map(w -> WeatherDto.WeatherSummary.builder()
                        .forecastDate(w.getForecastDate())
                        .temperatureC(w.getTemperatureC())
                        .humidityPct(w.getHumidityPct())
                        .rainfallMm(w.getRainfallMm())
                        .windKmph(w.getWindKmph())
                        .source(w.getSource())
                        .build())
                .collect(Collectors.toList());

        List<WeatherAlert> alerts = weatherAlertRepository.findByFarmIdAndAcknowledgedFalse(id);
        
        List<WeatherDto.AlertSummary> alertSummaries = alerts.stream()
                .map(a -> WeatherDto.AlertSummary.builder()
                        .id(a.getId().toString())
                        .alertType(a.getAlertType())
                        .message(a.getMessage())
                        .severity(a.getSeverity())
                        .triggeredAt(a.getTriggeredAt().toString())
                        .build())
                .collect(Collectors.toList());

        WeatherDto.DashboardWeatherResponse response = WeatherDto.DashboardWeatherResponse.builder()
                .forecast(forecast)
                .activeAlerts(alertSummaries)
                .build();

        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}

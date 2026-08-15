package com.farmchain.weather.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class WeatherDto {

    @Data
    @Builder
    public static class WeatherSummary {
        private LocalDate forecastDate;
        private BigDecimal temperatureC;
        private BigDecimal humidityPct;
        private BigDecimal rainfallMm;
        private BigDecimal windKmph;
        private String source;
    }

    @Data
    @Builder
    public static class AlertSummary {
        private String id;
        private String alertType;
        private String message;
        private String severity;
        private String triggeredAt;
    }
    
    @Data
    @Builder
    public static class DashboardWeatherResponse {
        private List<WeatherSummary> forecast;
        private List<AlertSummary> activeAlerts;
    }
}

package com.farmchain.weather.service;

import com.farmchain.farm.entity.Farm;
import com.farmchain.weather.entity.WeatherAlert;
import com.farmchain.weather.entity.WeatherData;
import com.farmchain.weather.repository.WeatherAlertRepository;
import com.farmchain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class WeatherRuleEngine {

    private final WeatherAlertRepository weatherAlertRepository;
    private final NotificationService notificationService;

    public void evaluateRules(Farm farm, WeatherData data) {
        // Rule 1: Heavy rain alert
        if (data.getRainfallMm() != null && data.getRainfallMm().compareTo(new BigDecimal("20.0")) > 0) {
            createAlertIfNotExist(farm, "HEAVY_RAIN", "Heavy rainfall (" + data.getRainfallMm() + " mm) expected on " + data.getForecastDate() + ". Delay irrigation or fertilizer application.", "HIGH");
        }

        // Rule 2: Fungal risk alert
        if (data.getHumidityPct() != null && data.getTemperatureC() != null) {
            boolean highHumidity = data.getHumidityPct().compareTo(new BigDecimal("85.0")) > 0;
            boolean moderateTemp = data.getTemperatureC().compareTo(new BigDecimal("20.0")) >= 0 && data.getTemperatureC().compareTo(new BigDecimal("30.0")) <= 0;
            
            if (highHumidity && moderateTemp) {
                createAlertIfNotExist(farm, "FUNGAL_RISK", "High humidity (" + data.getHumidityPct() + "%) and moderate temperature expected on " + data.getForecastDate() + ". Elevated fungal disease risk.", "MEDIUM");
            }
        }
    }

    private void createAlertIfNotExist(Farm farm, String alertType, String message, String severity) {
        // To avoid spamming, we check if an unacknowledged alert of the same type already exists for this farm
        boolean exists = weatherAlertRepository.findByFarmIdAndAcknowledgedFalse(farm.getId()).stream()
                .anyMatch(a -> a.getAlertType().equals(alertType));
                
        if (!exists) {
            WeatherAlert alert = WeatherAlert.builder()
                    .farm(farm)
                    .alertType(alertType)
                    .message(message)
                    .severity(severity)
                    .build();
            weatherAlertRepository.save(alert);
            
            notificationService.createNotification(
                    farm.getOwner(),
                    "WEATHER_ALERT",
                    "Weather Alert: " + message
            );
        }
    }
}

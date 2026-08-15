package com.farmchain.weather.repository;

import com.farmchain.weather.entity.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WeatherDataRepository extends JpaRepository<WeatherData, UUID> {
    Optional<WeatherData> findByLatitudeAndLongitudeAndForecastDate(BigDecimal latitude, BigDecimal longitude, LocalDate forecastDate);
}

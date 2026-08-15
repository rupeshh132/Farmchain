package com.farmchain.weather.repository;

import com.farmchain.weather.entity.WeatherAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WeatherAlertRepository extends JpaRepository<WeatherAlert, UUID> {
    List<WeatherAlert> findByFarmIdAndAcknowledgedFalse(UUID farmId);
}

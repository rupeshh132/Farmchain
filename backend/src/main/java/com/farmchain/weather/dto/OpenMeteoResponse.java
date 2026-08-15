package com.farmchain.weather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OpenMeteoResponse {
    private double latitude;
    private double longitude;
    private Daily daily;

    @Data
    public static class Daily {
        private List<String> time; // ["2023-10-01", "2023-10-02"]
        
        @JsonProperty("temperature_2m_max")
        private List<BigDecimal> temperature2mMax;
        
        @JsonProperty("relative_humidity_2m_mean")
        private List<BigDecimal> relativeHumidity2mMean;
        
        @JsonProperty("precipitation_sum")
        private List<BigDecimal> precipitationSum;
        
        @JsonProperty("wind_speed_10m_max")
        private List<BigDecimal> windSpeed10mMax;
    }
}

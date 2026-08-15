package com.farmchain.farm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

public class FarmDto {

    @Data
    public static class CreateFarmRequest {
        @NotBlank(message = "Farm name is required")
        private String farmName;

        @NotBlank(message = "State is required")
        private String state;

        @NotBlank(message = "District is required")
        private String district;

        private String village;
        private BigDecimal latitude;
        private BigDecimal longitude;
    }

    @Data
    public static class FarmResponse {
        private UUID id;
        private String farmName;
        private String state;
        private String district;
        private String village;
        private BigDecimal latitude;
        private BigDecimal longitude;
        private MeasurementResponse measurements;
        private SoilProfileResponse soilProfile;
    }

    @Data
    public static class SubmitMeasurementRequest {
        @NotNull
        @Positive
        private BigDecimal lengthValue;

        @NotNull
        @Positive
        private BigDecimal widthValue;

        @NotBlank
        private String inputUnit; // 'feet' or 'meter'
        
        private String bighaVariant; // optional
    }

    @Data
    public static class MeasurementResponse {
        private UUID id;
        private BigDecimal lengthValue;
        private BigDecimal widthValue;
        private String inputUnit;
        private BigDecimal areaSqft;
        private BigDecimal areaSqm;
        private BigDecimal areaAcre;
        private BigDecimal areaHectare;
        private BigDecimal areaBigha;
        private String bighaStateVariant;
    }

    @Data
    public static class SubmitSoilProfileRequest {
        private String soilType;
        private BigDecimal phValue;
        private String nitrogenLevel;
        private String phosphorusLevel;
        private String potassiumLevel;
        private Boolean irrigationAvailable;
        private String waterSource;
    }

    @Data
    public static class SoilProfileResponse {
        private UUID id;
        private String soilType;
        private BigDecimal phValue;
        private String nitrogenLevel;
        private String phosphorusLevel;
        private String potassiumLevel;
        private Boolean irrigationAvailable;
        private String waterSource;
    }
}

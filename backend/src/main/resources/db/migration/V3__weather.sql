-- ============================================================
-- FarmChain — V3: Weather Module
-- ============================================================

-- ========================
-- WEATHER DATA
-- ========================
CREATE TABLE weather_data (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    latitude        DECIMAL(9,6) NOT NULL,
    longitude       DECIMAL(9,6) NOT NULL,
    fetched_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    forecast_date   DATE         NOT NULL,
    temperature_c   DECIMAL(5,2),
    humidity_pct    DECIMAL(5,2),
    rainfall_mm     DECIMAL(6,2),
    wind_kmph       DECIMAL(5,2),
    source          VARCHAR(50)  NOT NULL,
    UNIQUE(latitude, longitude, forecast_date)
);

CREATE INDEX idx_weather_data_location_date ON weather_data(latitude, longitude, forecast_date);

-- ========================
-- WEATHER ALERTS
-- ========================
CREATE TABLE weather_alerts (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id         UUID        NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    alert_type      VARCHAR(50)  NOT NULL,
    message         TEXT         NOT NULL,
    severity        VARCHAR(20)  NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    triggered_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    acknowledged    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_weather_alerts_farm ON weather_alerts(farm_id, acknowledged);

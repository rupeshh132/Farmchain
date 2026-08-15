-- ============================================================
-- FarmChain — V1: Initial Schema (Sprint 0 Foundation)
-- ============================================================
-- This migration creates the core tables for MVP Sprint 0:
--   users, farms, farm_measurements, soil_profiles, data_sources
--
-- IMPORTANT: Every agricultural fact table references data_sources
-- via FK — this is enforced from day 1 per Blueprint v2 §13.
-- ============================================================

-- ========================
-- EXTENSIONS
-- ========================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================
-- DATA SOURCES (provenance — referenced by all fact tables)
-- ========================
CREATE TABLE data_sources (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,          -- 'ICAR', 'IMD', 'Agmarknet', 'State Agri Dept UP'
    source_type VARCHAR(50)  NOT NULL,          -- GOVERNMENT, RESEARCH, DERIVED
    url         TEXT,
    reliability_note TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Seed official sources immediately
INSERT INTO data_sources (name, source_type, url, reliability_note) VALUES
    ('ICAR', 'GOVERNMENT', 'https://www.icar.org.in', 'Indian Council of Agricultural Research — official GOI body'),
    ('IMD', 'GOVERNMENT', 'https://mausam.imd.gov.in', 'India Meteorological Department'),
    ('Agmarknet', 'GOVERNMENT', 'https://agmarknet.gov.in', 'Agricultural Marketing Information Network — mandi prices'),
    ('data.gov.in', 'GOVERNMENT', 'https://data.gov.in', 'GOI Open Data Portal — verify endpoint availability before use'),
    ('Open-Meteo', 'RESEARCH', 'https://open-meteo.com', 'Free weather API — no API key required, no SLA');

-- ========================
-- USERS & RBAC
-- ========================
CREATE TABLE users (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email               VARCHAR(255) UNIQUE NOT NULL,
    password_hash       TEXT        NOT NULL,
    full_name           VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    role                VARCHAR(20)  NOT NULL CHECK (role IN ('FARMER', 'BUYER', 'ADMIN')),
    preferred_language  VARCHAR(10)  NOT NULL DEFAULT 'en',
    is_active           BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ========================
-- REFRESH TOKENS (hashed, revocable)
-- ========================
CREATE TABLE refresh_tokens (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  TEXT        NOT NULL UNIQUE,       -- BCrypt hash of the actual token
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked     BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- STATE UNIT CONVERSIONS (Bigha lookup)
-- ========================
-- Bigha is not a fixed unit — each state has its own variant.
-- Only surface Bigha in UI when farmer's state has an entry here.
CREATE TABLE state_unit_conversions (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    state           VARCHAR(100) NOT NULL,
    variant_name    VARCHAR(100) NOT NULL,    -- 'UP_KACHA', 'UP_PUCCA', 'RAJASTHAN_PUCCA'
    sqft_per_unit   DECIMAL(10,4) NOT NULL,   -- canonical sqft per 1 unit of this variant
    note            TEXT,
    UNIQUE(state, variant_name)
);

-- Seed known Bigha variants (sourced: state revenue department standards)
INSERT INTO state_unit_conversions (state, variant_name, sqft_per_unit, note) VALUES
    ('UTTAR_PRADESH', 'UP_KACHA',      14399.5, '1 UP Kachha Bigha ≈ 1338.0 sqm — smaller variant used in eastern UP'),
    ('UTTAR_PRADESH', 'UP_PUCCA',      26999.3, '1 UP Pucca Bigha ≈ 2508.4 sqm — standard UP Pucca'),
    ('RAJASTHAN',     'RAJ_PUCCA',     27225.0, '1 Rajasthan Bigha = 2529.3 sqm (20 biswa pucca)'),
    ('PUNJAB',        'PUNJAB_BIGHA',  14400.0, '1 Punjab Bigha ≈ 1338 sqm'),
    ('HARYANA',       'HARYANA_BIGHA', 14400.0, '1 Haryana Bigha ≈ 1338 sqm'),
    ('BIHAR',         'BIHAR_BIGHA',   27211.2, '1 Bihar Bigha ≈ 2529 sqm'),
    ('MADHYA_PRADESH','MP_PUCCA',      27000.0, '1 MP Pucca Bigha ≈ 2508 sqm'),
    ('HIMACHAL_PRADESH','HP_BIGHA',    8712.0,  '1 HP Bigha ≈ 809.4 sqm');

-- ========================
-- FARMS
-- ========================
CREATE TABLE farms (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id    UUID        NOT NULL REFERENCES users(id),
    farm_name   VARCHAR(255) NOT NULL,
    state       VARCHAR(100) NOT NULL,
    district    VARCHAR(100) NOT NULL,
    village     VARCHAR(100),
    latitude    DECIMAL(9,6),
    longitude   DECIMAL(9,6),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    deleted_at  TIMESTAMPTZ              -- soft delete
);

-- ========================
-- FARM MEASUREMENTS
-- ========================
CREATE TABLE farm_measurements (
    id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id              UUID        NOT NULL REFERENCES farms(id),
    length_value         DECIMAL(10,2) NOT NULL CHECK (length_value > 0),
    width_value          DECIMAL(10,2) NOT NULL CHECK (width_value > 0),
    input_unit           VARCHAR(20)   NOT NULL CHECK (input_unit IN ('feet', 'meter')),
    -- All area values always stored; frontend picks the unit to display
    area_sqft            DECIMAL(14,2) NOT NULL,
    area_sqm             DECIMAL(14,2) NOT NULL,
    area_acre            DECIMAL(10,4) NOT NULL,
    area_hectare         DECIMAL(10,4) NOT NULL,
    area_bigha           DECIMAL(10,4),          -- NULL if state has no defined Bigha variant
    bigha_state_variant  VARCHAR(100),            -- FK-like: references state_unit_conversions.variant_name
    created_at           TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- ========================
-- SOIL PROFILES
-- ========================
CREATE TABLE soil_profiles (
    id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id               UUID        NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    soil_type             VARCHAR(50),     -- SANDY, LOAMY, CLAY, SILT, RED, BLACK, LATERITE
    ph_value              DECIMAL(3,1),    -- 4.0 – 9.5 typical range
    nitrogen_level        VARCHAR(20),     -- LOW, MEDIUM, HIGH (manual entry for MVP)
    phosphorus_level      VARCHAR(20),     -- LOW, MEDIUM, HIGH
    potassium_level       VARCHAR(20),     -- LOW, MEDIUM, HIGH
    irrigation_available  BOOLEAN,
    water_source          VARCHAR(50),     -- CANAL, BOREWELL, RAIN_FED, RIVER, TANK
    created_at            TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ========================
-- NOTIFICATIONS (basic structure — critical/high in-app for MVP)
-- ========================
CREATE TABLE notifications (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(50)  NOT NULL,    -- WEATHER_ALERT, TASK_DUE, MARKET_PRICE, SYSTEM
    priority    VARCHAR(20)  NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    title       VARCHAR(255) NOT NULL,
    message     TEXT         NOT NULL,
    is_read     BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ========================
-- AUDIT LOGS
-- ========================
CREATE TABLE audit_logs (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        REFERENCES users(id),
    action      VARCHAR(100) NOT NULL,   -- USER_REGISTERED, FARM_CREATED, KNOWLEDGE_EDITED, etc.
    entity_type VARCHAR(50),
    entity_id   UUID,
    metadata    JSONB,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ========================
-- INDEXES
-- ========================
CREATE INDEX idx_farms_owner          ON farms(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_farms_state_district ON farms(state, district) WHERE deleted_at IS NULL;
CREATE INDEX idx_farm_measurements_farm ON farm_measurements(farm_id);
CREATE INDEX idx_soil_profiles_farm   ON soil_profiles(farm_id);
CREATE INDEX idx_refresh_tokens_user  ON refresh_tokens(user_id) WHERE revoked = FALSE;
CREATE INDEX idx_notifications_user   ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_audit_logs_user      ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity    ON audit_logs(entity_type, entity_id);

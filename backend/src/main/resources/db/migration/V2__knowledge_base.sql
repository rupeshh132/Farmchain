-- ============================================================
-- FarmChain — V2: Knowledge Base
-- ============================================================

-- ========================
-- CROPS
-- ========================
CREATE TABLE crops (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150),
    category        VARCHAR(50)  NOT NULL  -- e.g., CEREAL, PULSE, OILSEED, VEGETABLE, FRUIT
);

-- ========================
-- CROP VARIETIES
-- ========================
CREATE TABLE crop_varieties (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_id             UUID        NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    variety_name        VARCHAR(150) NOT NULL,
    duration_days       INT,
    region_suitability  TEXT[]
);

-- ========================
-- AGRICULTURAL KNOWLEDGE (Core Deterministic Data)
-- ========================
CREATE TABLE agricultural_knowledge (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_id             UUID        NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    variety_id          UUID        REFERENCES crop_varieties(id) ON DELETE CASCADE,
    data_source_id      UUID        NOT NULL REFERENCES data_sources(id),
    region              VARCHAR(100),           -- Null means general applicability
    season              VARCHAR(50),            -- RABI, KHARIF, ZAID
    knowledge_type      VARCHAR(50) NOT NULL,   -- SEED, FERTILIZER_N, FERTILIZER_P, FERTILIZER_K, IRRIGATION
    per_hectare_value   DECIMAL(12,3) NOT NULL,
    unit                VARCHAR(20) NOT NULL,   -- kg, liters
    published_date      DATE,
    confidence_level    VARCHAR(20) DEFAULT 'OFFICIAL',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================
-- SEED DATA (MVP: Wheat Lok-1)
-- ========================
DO $$
DECLARE
    wheat_id UUID;
    lok1_id UUID;
    icar_id UUID;
BEGIN
    -- 1. Insert Crop (Wheat)
    INSERT INTO crops (name, scientific_name, category)
    VALUES ('Wheat', 'Triticum aestivum', 'CEREAL')
    RETURNING id INTO wheat_id;

    -- 2. Insert Crop Variety (Lok-1)
    INSERT INTO crop_varieties (crop_id, variety_name, duration_days, region_suitability)
    VALUES (wheat_id, 'Lok-1', 135, ARRAY['Madhya Pradesh', 'Gujarat', 'Maharashtra'])
    RETURNING id INTO lok1_id;

    -- 3. Get Data Source (ICAR)
    SELECT id INTO icar_id FROM data_sources WHERE name = 'ICAR' LIMIT 1;

    -- 4. Insert Knowledge
    -- SEED: ~100 kg/ha
    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (wheat_id, lok1_id, icar_id, 'RABI', 'SEED', 100.0, 'kg', '2023-01-01');

    -- FERTILIZER_N: ~120 kg/ha
    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (wheat_id, lok1_id, icar_id, 'RABI', 'FERTILIZER_N', 120.0, 'kg', '2023-01-01');

    -- FERTILIZER_P: ~60 kg/ha
    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (wheat_id, lok1_id, icar_id, 'RABI', 'FERTILIZER_P', 60.0, 'kg', '2023-01-01');

    -- FERTILIZER_K: ~40 kg/ha
    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (wheat_id, lok1_id, icar_id, 'RABI', 'FERTILIZER_K', 40.0, 'kg', '2023-01-01');

END $$;

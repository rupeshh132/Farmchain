-- ============================================================
-- FarmChain — V4: Seed More Crops
-- ============================================================

-- ============================================================
-- FarmChain — V4: Seed More Crops
-- ============================================================

DO $$
DECLARE
    icar_id UUID;
    crop1 UUID := '00000000-0000-0000-0000-000000000010';
    var1  UUID := '00000000-0000-0000-0000-000000000011';
    crop2 UUID := '00000000-0000-0000-0000-000000000020';
    var2  UUID := '00000000-0000-0000-0000-000000000021';
    crop3 UUID := '00000000-0000-0000-0000-000000000030';
    var3  UUID := '00000000-0000-0000-0000-000000000031';
BEGIN
    SELECT id INTO icar_id FROM data_sources WHERE name = 'ICAR' LIMIT 1;

    -- Add Rice (Paddy)
    INSERT INTO crops (id, name, scientific_name, category)
    VALUES (crop1, 'Rice (Paddy)', 'Oryza sativa', 'CEREAL');

    INSERT INTO crop_varieties (id, crop_id, variety_name, duration_days, region_suitability)
    VALUES (var1, crop1, 'IR-64', 120, ARRAY['Madhya Pradesh', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Maharashtra']);

    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, region, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (crop1, var1, icar_id, 'All India', 'KHARIF', 'SEED', 25.0, 'kg', '2023-01-01');

    -- Add Maize
    INSERT INTO crops (id, name, scientific_name, category)
    VALUES (crop2, 'Maize', 'Zea mays', 'CEREAL');

    INSERT INTO crop_varieties (id, crop_id, variety_name, duration_days, region_suitability)
    VALUES (var2, crop2, 'Ganga-5', 100, ARRAY['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Karnataka']);

    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, region, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (crop2, var2, icar_id, 'All India', 'KHARIF', 'SEED', 20.0, 'kg', '2023-01-01');

    -- Add Mustard
    INSERT INTO crops (id, name, scientific_name, category)
    VALUES (crop3, 'Mustard', 'Brassica juncea', 'OILSEED');

    INSERT INTO crop_varieties (id, crop_id, variety_name, duration_days, region_suitability)
    VALUES (var3, crop3, 'Pusa Bold', 130, ARRAY['Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Haryana']);

    INSERT INTO agricultural_knowledge (crop_id, variety_id, data_source_id, region, season, knowledge_type, per_hectare_value, unit, published_date)
    VALUES (crop3, var3, icar_id, 'All India', 'RABI', 'SEED', 5.0, 'kg', '2023-01-01');

END $$;

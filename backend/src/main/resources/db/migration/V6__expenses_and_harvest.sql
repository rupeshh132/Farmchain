-- ============================================================
-- FarmChain — V6: Cost & Harvest
-- ============================================================

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES farming_plans(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,   -- SEED, FERTILIZER, LABOUR, IRRIGATION, OTHER
    amount DECIMAL(12,2) NOT NULL,
    incurred_at DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE harvests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES farming_plans(id) ON DELETE CASCADE,
    actual_quantity_kg DECIMAL(12,2) NOT NULL,
    harvest_date DATE NOT NULL,
    quality_grade VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

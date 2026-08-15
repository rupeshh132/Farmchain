-- ============================================================
-- FarmChain — V10: Yield Predictions
-- ============================================================

CREATE TABLE yield_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES farming_plans(id) ON DELETE CASCADE,
    predicted_min_kg DECIMAL(12,2),
    predicted_max_kg DECIMAL(12,2),
    model_version VARCHAR(50) DEFAULT 'mock-v1',
    predicted_at TIMESTAMPTZ DEFAULT now()
);

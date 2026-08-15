-- ============================================================
-- FarmChain — V9: Disease Scans
-- ============================================================

CREATE TABLE disease_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    image_url TEXT,
    predicted_disease VARCHAR(100) NOT NULL,
    confidence_score DECIMAL(5,2) NOT NULL,
    recommended_action TEXT,
    scanned_at TIMESTAMPTZ DEFAULT now()
);

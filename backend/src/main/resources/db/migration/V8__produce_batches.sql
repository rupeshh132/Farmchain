-- ============================================================
-- FarmChain — V8: Produce Batches & Traceability
-- ============================================================

CREATE TABLE produce_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    harvest_id UUID REFERENCES harvests(id) ON DELETE SET NULL,
    crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    quantity_kg DECIMAL(12,2),
    qr_code TEXT UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'CREATED',  -- CREATED, IN_TRANSIT, SOLD
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE traceability_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES produce_batches(id) ON DELETE CASCADE,
    event_type VARCHAR(50),   -- HARVESTED, QUALITY_CHECKED, TRANSFERRED, SOLD
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    occurred_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FarmChain — V11: Blockchain Transactions
-- ============================================================

CREATE TABLE blockchain_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    traceability_event_id UUID NOT NULL REFERENCES traceability_events(id) ON DELETE CASCADE,
    tx_hash VARCHAR(100) NOT NULL,
    network VARCHAR(50) NOT NULL DEFAULT 'Polygon Amoy Testnet',
    status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING, CONFIRMED, FAILED
    submitted_at TIMESTAMPTZ DEFAULT now(),
    confirmed_at TIMESTAMPTZ
);

-- ============================================================
-- FarmChain — V7: Market Prices
-- ============================================================

CREATE TABLE markets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL
);

CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    market_id UUID NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
    crop_id UUID NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    modal_price DECIMAL(10,2) NOT NULL,
    price_date DATE NOT NULL,
    source VARCHAR(50) NOT NULL,
    ingested_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_market_prices_crop_date ON market_prices(crop_id, price_date DESC);

-- Seed a few markets
INSERT INTO markets (name, state, district) VALUES
('Sehore Mandi', 'Madhya Pradesh', 'Sehore'),
('Khanna Mandi', 'Punjab', 'Ludhiana'),
('Karnal Mandi', 'Haryana', 'Karnal'),
('Latur Mandi', 'Maharashtra', 'Latur');

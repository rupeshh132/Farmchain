-- ============================================================
-- FarmChain — V5: Farming Plans & Tasks
-- ============================================================

CREATE TABLE farming_plans (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id                 UUID        NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    crop_id                 UUID        NOT NULL REFERENCES crops(id),
    variety_id              UUID        REFERENCES crop_varieties(id),
    sowing_date             DATE        NOT NULL,
    expected_harvest_date   DATE,
    status                  VARCHAR(20) DEFAULT 'ACTIVE',  -- ACTIVE, HARVESTED, ABANDONED
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE farming_tasks (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id                 UUID        NOT NULL REFERENCES farming_plans(id) ON DELETE CASCADE,
    task_type               VARCHAR(50) NOT NULL, -- SOWING, FERTILIZER, HARVEST, IRRIGATION
    title                   VARCHAR(150) NOT NULL,
    due_date                DATE        NOT NULL,
    is_completed            BOOLEAN     DEFAULT FALSE,
    notes                   TEXT,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

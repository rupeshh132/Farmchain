# 🌾 FarmChain

> **Farm Intelligence + Climate Intelligence + Crop Intelligence + Farm Economics + Market Intelligence**

FarmChain is a farmer-centric agricultural decision-support platform that helps Indian smallholder farmers answer four core questions:

1. **What should I grow?** — Context-aware, rule-based crop recommendation (ML re-ranking in V1)
2. **How should I grow it?** — Personalized input calculator + dynamic crop calendar
3. **What should I do today?** — Weather-aware task alerts, risk flags
4. **What is my crop worth?** — Sourced mandi prices + net realization ranking

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Spring Boot 3 (Java 21) — Modular Monolith |
| Database | PostgreSQL (Neon free tier) + Flyway migrations |
| ML Service | Python 3.11 + FastAPI + scikit-learn |
| Blockchain | Solidity (EVM testnet) + Hardhat |
| Hosting | Vercel (frontend) + Render (backend + ML) |

---

## Repository Structure

```
farmchain/
├── frontend/          # React + TypeScript + Vite SPA
├── backend/           # Spring Boot modular monolith
├── ml-service/        # FastAPI crop recommendation + yield prediction
├── blockchain/        # Solidity contracts + Hardhat scripts
│   ├── contracts/
│   └── scripts/
├── docs/
│   ├── architecture/  # Architecture decision records
│   ├── api/           # API documentation
│   └── adr/           # ADRs
└── .github/workflows/ # CI/CD pipelines
```

---

## Quick Start (Development)

### Prerequisites
- Java 21+
- Node.js 22+
- Maven 3.9+
- Docker (optional, for local Postgres)

### Backend
```bash
cd backend
cp .env.example .env   # fill in your Neon DB connection string
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## MVP Scope

✅ Farm profile + area calculation (including state-specific Bigha)
✅ Rule-based crop recommendation with explainability
✅ Deterministic input calculator (seed/fertilizer/water per hectare × farm area)
✅ Weather ingestion + critical alerts
✅ Static crop calendar
✅ Estimated farm economics
✅ Sourced market price display
✅ Produce batch record + QR (DB only, no blockchain yet)

> MVP has **no ML and no blockchain** — those are V1 features added once the deterministic core is validated.

---

## Design Philosophy

- Every agricultural fact shown with source + last-updated date — no unsourced claims
- ML used only where deterministic logic genuinely can't solve the problem
- Every recommendation includes an explanation (not a bare score)
- ₹0 infrastructure for MVP — all free-tier dependencies documented with their limitations

---

## Sprint Roadmap

See [`docs/architecture/SPRINT_ROADMAP.md`](docs/architecture/SPRINT_ROADMAP.md)

## Blueprint Documents

- [`FarmChain_Blueprint.md`](FarmChain_Blueprint.md) — v1 Master Engineering Blueprint
- [`FarmChain_Blueprint_v2.md`](FarmChain_Blueprint_v2.md) — v2 Intelligence + UX layer

---

*Built by Rupesh Vishwakarma — [Portfolio](https://your-portfolio.dev)*

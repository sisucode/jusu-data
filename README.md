# JUSU-DATA · V85 Trav-Motor Dashboard v2.0

High-performance betting analytics for Swedish harness racing (trav).  
Isolates statistical edges from late configuration shifts (Barefoot-style) vs market consensus.

## Stack

- **Next.js 16** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS v4**
- Dark-mode premium UI (slate-950 + neon lime / gold accents)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Core features (front-end)

| Component | Description |
|-----------|-------------|
| **Track Geometry Card** | Live T-Minus countdown, track bias alert, mini 3D-style track profile with short stretch highlighted |
| **V85 Leg Matrix** | 8-tab responsive system. Horse / Driver / Post / Pool % / Model Prob / Value Ratio |
| **Recalc Toggles** | “Pappa’s Early Speed Alert” + “Trainer Warning” — instant client-side recompute |
| **Golden Nugget** | Value Ratio ≥ 1.15 → neon green glow + badge |
| **Overbet** | Value Ratio < 0.90 → muted red + 60 % opacity |
| **Noise Filter** | Pool < 5 % → greyscale + suppressed |

## Edge engine logic

```
modelProb = poolPct/100
  × 1.30  if 10–25 % pool   (late Barefoot mid-tier boost)
  × 1.05  if >40 % pool     (favourite stability)
  × 1.10  if Early Speed + post 1-5
  × 0.88  if Trainer Warning

valueRatio = modelProb / (poolPct/100)
```

## Assets

SVG branding lives in `/public/assets/`:

- `logo.svg` – holographic JD mark
- `golden-nugget.svg` – edge badge
- `track-profile.svg` – Gävle short-stretch profile

## Data

When live ATG / external APIs are unreachable the app falls back instantly to a full mock **Gävle V85** card (`src/data/mockV85.ts`) so the UI is always interactive.

## Project layout

```
src/
  app/            # Next.js App Router
  components/     # TrackGeometryCard, V85LegMatrix, HorseRow, Header
  data/           # mockV85.ts
  hooks/          # useCountdown
  lib/            # calculateValue.ts (edge engine)
  types/          # shared TS interfaces
public/assets/    # SVG branding
```

---

Built for production-ready iteration. Swap the mock card for a real ATG feed when ready.

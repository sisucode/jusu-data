import type { Horse } from "@/types";

/**
 * Core edge engine for JUSU-DATA.
 *
 * Anchors model_probability to pool_percentage, then applies
 * late Barefoot / configuration shift boosts + track bias.
 *
 * Value Ratio = modelProb / (poolPct / 100)
 *   ≥ 1.15 → GOLDEN NUGGET
 *   < 0.90 → OVERBET
 *   pool < 5% → NOISE (filtered)
 */

const BAREFOOT_MID_BOOST = 1.3; // 10-25% pool runners
const FAVORITE_BOOST = 1.05; // >40% pool
const EARLY_SPEED_POST_BOOST = 1.1; // post 1-5 + Early Speed active
const TRAINER_WARNING_PENALTY = 0.88;

export function computeModelProb(horse: Horse): number {
  const base = horse.poolPct / 100;

  let multiplier = 1;

  // Late Barefoot shift logic
  if (horse.poolPct >= 10 && horse.poolPct <= 25) {
    multiplier *= BAREFOOT_MID_BOOST;
  } else if (horse.poolPct > 40) {
    multiplier *= FAVORITE_BOOST;
  }

  // Track bias: early speed from inner posts
  if (horse.earlySpeed && horse.post >= 1 && horse.post <= 5) {
    multiplier *= EARLY_SPEED_POST_BOOST;
  }

  // Trainer warning dampens confidence
  if (horse.trainerWarning) {
    multiplier *= TRAINER_WARNING_PENALTY;
  }

  // Soft ceiling so modelProb never explodes past ~0.65 on a single runner
  const raw = base * multiplier;
  return Math.min(raw, 0.65);
}

export function computeValueRatio(modelProb: number, poolPct: number): number {
  if (poolPct <= 0) return 0;
  return modelProb / (poolPct / 100);
}

export function enrichHorse(horse: Horse): Horse {
  const modelProb = computeModelProb(horse);
  const valueRatio = computeValueRatio(modelProb, horse.poolPct);
  return {
    ...horse,
    modelProb: Math.round(modelProb * 1000) / 1000,
    valueRatio: Math.round(valueRatio * 100) / 100,
  };
}

export function enrichField(horses: Horse[]): Horse[] {
  return horses.map(enrichHorse);
}

/** Visual classification for Tailwind row styling */
export type RowTier = "golden" | "overbet" | "noise" | "neutral";

export function getRowTier(horse: Horse): RowTier {
  if (horse.poolPct < 5) return "noise";
  if (!horse.valueRatio) return "neutral";
  if (horse.valueRatio >= 1.15) return "golden";
  if (horse.valueRatio < 0.9) return "overbet";
  return "neutral";
}

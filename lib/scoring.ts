import { CategoryScores } from "@/types";

const weights = {
  hegemony: 45,
  rise: 25,
  sustain: 20,
  europe: 10
};

const maxValues = {
  hegemony: 20,
  rise: 15,
  sustain: 15,
  europe: 10
};

interface CategoryBreakdown {
  normalized: number;
  weighted: number;
}

export interface ScoreResult {
  total: number;
  breakdown: Record<keyof CategoryScores, CategoryBreakdown>;
}

export function calculateScore(scores: CategoryScores): ScoreResult {
  let total = 0;

  const breakdown = {} as Record<keyof CategoryScores, CategoryBreakdown>;

  (Object.keys(scores) as (keyof CategoryScores)[]).forEach((key) => {
    const normalized = scores[key] / maxValues[key];
    const weighted = normalized * weights[key];

    breakdown[key] = {
      normalized: Math.round(normalized * 100),
      weighted: Math.round(weighted)
    };

    total += weighted;
  });

  return {
    total: Math.round(total),
    breakdown
  };
}
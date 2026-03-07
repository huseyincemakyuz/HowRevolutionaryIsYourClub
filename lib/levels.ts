export function getLevel(score: number) {
  if (score === 100) return "The Benchmark (TRI)";
  if (score >= 90) return "Trabzon-Level Revolution";
  if (score >= 81) return "Strong Revolution";
  if (score >= 61) return "Hegemony Breaker";
  if (score >= 41) return "League Disruptor";
  if (score >= 21) return "Regional Challenger";

  return "Local Spirit";
}
/**
 * Estimate yearly running cost for an appliance.
 * Default: EU average electricity price ~€0.28/kWh, 4 wash cycles per week.
 */
export function estimateYearlyCost(
  kWhPerCycle: number,
  cyclesPerWeek: number = 4,
  electricityPricePerKwh: number = 0.28
): number {
  const cyclesPerYear = cyclesPerWeek * 52;
  return Math.round(kWhPerCycle * cyclesPerYear * electricityPricePerKwh * 100) / 100;
}

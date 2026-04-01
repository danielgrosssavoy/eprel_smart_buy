import type { EnergyClass, NoiseClass } from '../../../types/common';

export interface WashingMachine {
  id: string;
  brand: string;
  modelIdentifier: string;
  energyClass: EnergyClass;
  energyConsumptionPer100Cycles: number;
  energyConsumptionPerCycle: number;
  waterConsumptionPerCycle: number;
  ratedCapacity: number;
  spinDryingEfficiencyClass: EnergyClass;
  maxSpinSpeed: number;
  programmeDuration: number;
  noiseLevel: number;
  noiseClass: NoiseClass;
  repairabilityScore: number;
  sparePartsAvailabilityYears: number;
  estimatedPrice: number;
  estimatedYearlyCost?: number;
  imageUrl?: string;
}

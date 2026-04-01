import { useMemo } from 'react';
import type { WashingMachine } from '../types/washingMachine';
import type { EnergyClass } from '../../../types/common';

export interface Filters {
  search: string;
  brands: string[];
  energyClasses: EnergyClass[];
  priceRange: [number, number];
  capacityRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'energy' | 'repairability';
}

export const defaultFilters: Filters = {
  search: '',
  brands: [],
  energyClasses: [],
  priceRange: [0, 2000],
  capacityRange: [0, 15],
  sortBy: 'price-asc',
};

export function useProductFilter(products: WashingMachine[], filters: Filters): WashingMachine[] {
  return useMemo(() => {
    let filtered = products.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.brand.toLowerCase().includes(q) &&
          !p.modelIdentifier.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      if (filters.energyClasses.length > 0 && !filters.energyClasses.includes(p.energyClass)) {
        return false;
      }

      if (p.estimatedPrice < filters.priceRange[0] || p.estimatedPrice > filters.priceRange[1]) {
        return false;
      }

      if (p.ratedCapacity < filters.capacityRange[0] || p.ratedCapacity > filters.capacityRange[1]) {
        return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.estimatedPrice - b.estimatedPrice;
        case 'price-desc':
          return b.estimatedPrice - a.estimatedPrice;
        case 'energy':
          return a.energyClass.localeCompare(b.energyClass);
        case 'repairability':
          return b.repairabilityScore - a.repairabilityScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);
}

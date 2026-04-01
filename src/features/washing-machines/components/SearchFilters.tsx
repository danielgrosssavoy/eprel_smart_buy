import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Filters } from '../hooks/useProductFilter';
import type { EnergyClass } from '../../../types/common';

const ALL_ENERGY_CLASSES: EnergyClass[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const energyColors: Record<EnergyClass, string> = {
  A: 'bg-green-700 text-white',
  B: 'bg-green-500 text-white',
  C: 'bg-yellow-400 text-gray-900',
  D: 'bg-yellow-500 text-gray-900',
  E: 'bg-orange-500 text-white',
  F: 'bg-red-500 text-white',
  G: 'bg-red-700 text-white',
};

interface Props {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  brands: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export function SearchFilters({ filters, onFilterChange, brands, isOpen, onToggle }: Props) {
  const update = (partial: Partial<Filters>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.energyClasses.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 2000 ||
    filters.capacityRange[0] > 0 ||
    filters.capacityRange[1] < 15;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Search bar - always visible */}
      <div className="p-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
            isOpen
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-green-600" />
          )}
        </button>
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as Filters['sortBy'] })}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="energy">Energy Class</option>
          <option value="repairability">Repairability</option>
        </select>
      </div>

      {/* Expandable filter panel */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    const next = filters.brands.includes(brand)
                      ? filters.brands.filter((b) => b !== brand)
                      : [...filters.brands, brand];
                    update({ brands: next });
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.brands.includes(brand)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Energy class filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Energy Class</label>
            <div className="flex gap-1.5">
              {ALL_ENERGY_CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    const next = filters.energyClasses.includes(cls)
                      ? filters.energyClasses.filter((c) => c !== cls)
                      : [...filters.energyClasses, cls];
                    update({ energyClasses: next });
                  }}
                  className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                    filters.energyClasses.includes(cls)
                      ? `${energyColors[cls]} ring-2 ring-offset-1 ring-gray-400`
                      : `${energyColors[cls]} opacity-40 hover:opacity-70`
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price: up to {filters.priceRange[1] === 2000 ? '2000+' : `€${filters.priceRange[1]}`}
            </label>
            <input
              type="range"
              min={0}
              max={2000}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => update({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              className="w-full accent-green-600"
            />
          </div>

          {/* Capacity range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity: {filters.capacityRange[0]}–{filters.capacityRange[1]} kg
            </label>
            <input
              type="range"
              min={0}
              max={15}
              step={1}
              value={filters.capacityRange[1]}
              onChange={(e) => update({ capacityRange: [filters.capacityRange[0], Number(e.target.value)] })}
              className="w-full accent-green-600"
            />
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <div className="sm:col-span-2 lg:col-span-4">
              <button
                onClick={() =>
                  update({
                    brands: [],
                    energyClasses: [],
                    priceRange: [0, 2000],
                    capacityRange: [0, 15],
                  })
                }
                className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

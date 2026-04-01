import { Droplets, Volume2, Gauge, Wrench } from 'lucide-react';
import type { WashingMachine } from '../types/washingMachine';
import { EnergyClassBadge } from '../../../components/ui/EnergyClassBadge';
import { estimateYearlyCost } from '../../../utils/costCalculator';
import { formatCurrency } from '../../../utils/formatters';

interface Props {
  product: WashingMachine;
  layout: 'grid' | 'list';
  isCompareSelected: boolean;
  isCompareFull: boolean;
  onToggleCompare: (id: string) => void;
  onViewDetails: (product: WashingMachine) => void;
}

export function ProductCard({ product, layout, isCompareSelected, isCompareFull, onToggleCompare, onViewDetails }: Props) {
  const yearlyCost = estimateYearlyCost(product.energyConsumptionPerCycle);

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden">
        <div className="flex items-center gap-4 p-4">
          {/* Brand + model */}
          <div className="min-w-[140px]">
            <p className="text-sm font-medium text-gray-500">{product.brand}</p>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{product.modelIdentifier}</h3>
          </div>

          {/* Energy badge */}
          <EnergyClassBadge energyClass={product.energyClass} />

          {/* Key specs */}
          <div className="flex items-center gap-4 flex-1 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-gray-400" />
              <span>{product.ratedCapacity} kg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>{product.waterConsumptionPerCycle} L</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-gray-400" />
              <span>{product.noiseLevel} dB</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>{product.repairabilityScore}/10</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-right min-w-[100px]">
            <span className="text-lg font-bold text-gray-900">{formatCurrency(product.estimatedPrice)}</span>
            <p className="text-xs text-gray-500">~{formatCurrency(yearlyCost)}/yr</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => onViewDetails(product)}
              className="text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onToggleCompare(product.id)}
              disabled={!isCompareSelected && isCompareFull}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                isCompareSelected
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : isCompareFull
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isCompareSelected ? 'Comparing' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden">
      {/* Top section: brand + energy badge */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-gray-500">{product.brand}</p>
            <h3 className="text-base font-semibold text-gray-900 leading-tight">{product.modelIdentifier}</h3>
          </div>
          <EnergyClassBadge energyClass={product.energyClass} />
        </div>

        {/* Price + yearly cost */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">{formatCurrency(product.estimatedPrice)}</span>
          <span className="text-sm text-gray-500">~{formatCurrency(yearlyCost)}/yr</span>
        </div>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Gauge className="w-3.5 h-3.5 text-gray-400" />
            <span>{product.ratedCapacity} kg</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span>{product.waterConsumptionPerCycle} L</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Volume2 className="w-3.5 h-3.5 text-gray-400" />
            <span>{product.noiseLevel} dB</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>{product.repairabilityScore}/10</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
        <button
          onClick={() => onViewDetails(product)}
          className="flex-1 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 py-2 rounded-lg transition-colors"
        >
          Details
        </button>
        <button
          onClick={() => onToggleCompare(product.id)}
          disabled={!isCompareSelected && isCompareFull}
          className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
            isCompareSelected
              ? 'bg-green-600 text-white hover:bg-green-700'
              : isCompareFull
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isCompareSelected ? 'Comparing' : 'Compare'}
        </button>
      </div>
    </div>
  );
}

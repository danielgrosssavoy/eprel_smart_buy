import { X, Zap, Droplets, Volume2, Gauge, Wrench, Clock, RotateCcw } from 'lucide-react';
import type { WashingMachine } from '../types/washingMachine';
import { EnergyClassBadge } from '../../../components/ui/EnergyClassBadge';
import { estimateYearlyCost } from '../../../utils/costCalculator';
import { formatCurrency } from '../../../utils/formatters';

interface Props {
  product: WashingMachine;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: Props) {
  const yearlyCost = estimateYearlyCost(product.energyConsumptionPerCycle);
  const fiveYearCost = product.estimatedPrice + yearlyCost * 5;
  const tenYearCost = product.estimatedPrice + yearlyCost * 10;

  const repairColor =
    product.repairabilityScore >= 7
      ? 'text-green-600'
      : product.repairabilityScore >= 5
        ? 'text-yellow-600'
        : 'text-red-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-500">{product.brand}</p>
            <h2 className="text-xl font-bold text-gray-900">{product.modelIdentifier}</h2>
          </div>
          <div className="flex items-center gap-3">
            <EnergyClassBadge energyClass={product.energyClass} />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cost overview */}
        <div className="p-6 bg-green-50 border-b border-green-100">
          <h3 className="text-sm font-semibold text-green-800 mb-3">Cost Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-green-600 mb-1">Purchase Price</p>
              <p className="text-lg font-bold text-green-900">{formatCurrency(product.estimatedPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Yearly Running Cost</p>
              <p className="text-lg font-bold text-green-900">{formatCurrency(yearlyCost)}</p>
              <p className="text-xs text-green-600">at €0.28/kWh, 4 cycles/week</p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Total Cost of Ownership</p>
              <p className="text-sm font-semibold text-green-900">5 yr: {formatCurrency(fiveYearCost)}</p>
              <p className="text-sm font-semibold text-green-900">10 yr: {formatCurrency(tenYearCost)}</p>
            </div>
          </div>
        </div>

        {/* Specs grid */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Specifications</h3>
          <div className="grid grid-cols-2 gap-4">
            <SpecRow icon={<Zap className="w-4 h-4 text-yellow-500" />} label="Energy per cycle" value={`${product.energyConsumptionPerCycle} kWh`} />
            <SpecRow icon={<Zap className="w-4 h-4 text-yellow-500" />} label="Energy per 100 cycles" value={`${product.energyConsumptionPer100Cycles} kWh`} />
            <SpecRow icon={<Droplets className="w-4 h-4 text-blue-500" />} label="Water per cycle" value={`${product.waterConsumptionPerCycle} L`} />
            <SpecRow icon={<Gauge className="w-4 h-4 text-gray-500" />} label="Capacity" value={`${product.ratedCapacity} kg`} />
            <SpecRow icon={<RotateCcw className="w-4 h-4 text-gray-500" />} label="Max spin speed" value={`${product.maxSpinSpeed} rpm`} />
            <SpecRow icon={<Clock className="w-4 h-4 text-gray-500" />} label="Programme duration" value={`${product.programmeDuration} min`} />
            <SpecRow icon={<Volume2 className="w-4 h-4 text-gray-500" />} label="Noise level" value={`${product.noiseLevel} dB (Class ${product.noiseClass})`} />
            <SpecRow
              icon={<EnergyClassBadge energyClass={product.spinDryingEfficiencyClass} />}
              label="Spin drying efficiency"
              value={`Class ${product.spinDryingEfficiencyClass}`}
            />
          </div>
        </div>

        {/* Repairability */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Repairability & Sustainability</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">Repairability Score</span>
              </div>
              <span className={`text-lg font-bold ${repairColor}`}>
                {product.repairabilityScore}/10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
              <div
                className={`h-2.5 rounded-full ${
                  product.repairabilityScore >= 7 ? 'bg-green-500' : product.repairabilityScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${product.repairabilityScore * 10}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              Spare parts available for {product.sparePartsAvailabilityYears} years. Score is estimated based on manufacturer data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-50">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

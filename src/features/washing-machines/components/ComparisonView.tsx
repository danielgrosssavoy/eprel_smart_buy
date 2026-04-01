import { X } from 'lucide-react';
import type { WashingMachine } from '../types/washingMachine';
import { EnergyClassBadge } from '../../../components/ui/EnergyClassBadge';
import { estimateYearlyCost } from '../../../utils/costCalculator';
import { formatCurrency } from '../../../utils/formatters';

interface Props {
  products: WashingMachine[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

interface Row {
  label: string;
  getValue: (p: WashingMachine) => string | number;
  bestFn?: 'min' | 'max';
  unit?: string;
}

const rows: Row[] = [
  { label: 'Price', getValue: (p) => p.estimatedPrice, bestFn: 'min', unit: '€' },
  { label: 'Yearly Running Cost', getValue: (p) => estimateYearlyCost(p.energyConsumptionPerCycle), bestFn: 'min', unit: '€' },
  { label: 'Energy per Cycle', getValue: (p) => p.energyConsumptionPerCycle, bestFn: 'min', unit: ' kWh' },
  { label: 'Water per Cycle', getValue: (p) => p.waterConsumptionPerCycle, bestFn: 'min', unit: ' L' },
  { label: 'Capacity', getValue: (p) => p.ratedCapacity, bestFn: 'max', unit: ' kg' },
  { label: 'Max Spin Speed', getValue: (p) => p.maxSpinSpeed, bestFn: 'max', unit: ' rpm' },
  { label: 'Programme Duration', getValue: (p) => p.programmeDuration, bestFn: 'min', unit: ' min' },
  { label: 'Noise Level', getValue: (p) => p.noiseLevel, bestFn: 'min', unit: ' dB' },
  { label: 'Repairability', getValue: (p) => p.repairabilityScore, bestFn: 'max', unit: '/10' },
  { label: 'Spare Parts Availability', getValue: (p) => p.sparePartsAvailabilityYears, bestFn: 'max', unit: ' yrs' },
];

export function ComparisonView({ products, onRemove, onClose }: Props) {
  const getBestIndex = (row: Row): number => {
    if (!row.bestFn || products.length < 2) return -1;
    const values = products.map((p) => Number(row.getValue(p)));
    const best = row.bestFn === 'min' ? Math.min(...values) : Math.max(...values);
    const allSame = values.every((v) => v === best);
    if (allSame) return -1;
    return values.indexOf(best);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Compare Products</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product headers */}
        <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
          <div className="p-4" />
          {products.map((p) => (
            <div key={p.id} className="p-4 text-center border-l border-gray-100">
              <div className="flex justify-center mb-2">
                <EnergyClassBadge energyClass={p.energyClass} />
              </div>
              <p className="text-sm font-medium text-gray-500">{p.brand}</p>
              <p className="text-sm font-semibold text-gray-900">{p.modelIdentifier}</p>
              <button
                onClick={() => onRemove(p.id)}
                className="mt-2 text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        {rows.map((row) => {
          const bestIdx = getBestIndex(row);
          return (
            <div
              key={row.label}
              className="grid border-b border-gray-50"
              style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
            >
              <div className="p-3 px-4 text-sm font-medium text-gray-600 bg-gray-50">{row.label}</div>
              {products.map((p, i) => {
                const val = row.getValue(p);
                const isBest = i === bestIdx;
                return (
                  <div
                    key={p.id}
                    className={`p-3 text-center text-sm border-l border-gray-50 ${
                      isBest ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-800'
                    }`}
                  >
                    {row.unit === '€' ? formatCurrency(Number(val)) : `${val}${row.unit || ''}`}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* 5-year TCO */}
        <div
          className="grid border-t-2 border-green-200 bg-green-50"
          style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
        >
          <div className="p-3 px-4 text-sm font-semibold text-green-800">5-Year Total Cost</div>
          {products.map((p) => {
            const tco = p.estimatedPrice + estimateYearlyCost(p.energyConsumptionPerCycle) * 5;
            return (
              <div key={p.id} className="p-3 text-center text-sm font-bold text-green-800 border-l border-green-200">
                {formatCurrency(tco)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

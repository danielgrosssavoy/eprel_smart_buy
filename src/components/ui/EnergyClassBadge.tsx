import type { EnergyClass } from '../../types/common';

const colorMap: Record<EnergyClass, string> = {
  A: 'bg-green-700 text-white',
  B: 'bg-green-500 text-white',
  C: 'bg-yellow-400 text-gray-900',
  D: 'bg-yellow-500 text-gray-900',
  E: 'bg-orange-500 text-white',
  F: 'bg-red-500 text-white',
  G: 'bg-red-700 text-white',
};

export function EnergyClassBadge({ energyClass }: { energyClass: EnergyClass }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded font-bold text-sm ${colorMap[energyClass]}`}
    >
      {energyClass}
    </span>
  );
}

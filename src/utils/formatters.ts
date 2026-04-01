export function formatCurrency(value: number): string {
  return `€${value.toFixed(2)}`;
}

export function formatEnergy(kWh: number): string {
  return `${kWh} kWh`;
}

export function formatNoise(dB: number): string {
  return `${dB} dB`;
}

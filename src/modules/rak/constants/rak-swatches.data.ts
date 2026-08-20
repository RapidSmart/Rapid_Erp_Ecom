import type { Rak } from '../types/rak.types'

export const RAK_SWATCHES: Readonly<Record<string, string>> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  indigo: '#6366f1',
  lime: '#84cc16',
  amber: '#f59e0b',
  brown: '#a16207',
  gray: '#6b7280',
  grey: '#6b7280',
  black: '#111827',
  white: '#f8fafc',
  navy: '#1e293b',
  maroon: '#7f1d1d',
  violet: '#7c3aed',
  magenta: '#d946ef',
  coral: '#fb7185',
  turquoise: '#2dd4bf',
  gold: '#ca8a04',
  silver: '#9ca3af',
}

export const DEFAULT_SWATCH = '#9ca3af'

export function resolveRakSwatch(rak: Pick<Rak, 'code' | 'name'>): string {
  const byCode = RAK_SWATCHES[rak.code.trim().toLowerCase()]
  if (byCode) return byCode

  const byName = RAK_SWATCHES[rak.name.trim().toLowerCase()]
  if (byName) return byName

  return DEFAULT_SWATCH
}
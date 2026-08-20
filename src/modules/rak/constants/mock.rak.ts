import type { Rak, RakOverview } from '../types/rak.types'

export const MOCK_RAK: Rak[] = [
  {
    id: 'rak-1' as any,
    code: 'ALPHA',
    name: 'Alpha',
    description: 'First sample record in the master data list.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'rak-2' as any,
    code: 'BETA',
    name: 'Beta',
    description: 'Second sample record in the master data list.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'rak-3' as any,
    code: 'GAMMA',
    name: 'Gamma',
    description: 'Third sample record, inactive for demo purposes.',
    status: 'inactive',
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_RAK_OVERVIEW: RakOverview = {
  total: { value: 3, percentage: 100 },
  active: { value: 2, percentage: 66.6 },
  inactive: { value: 1, percentage: 33.3 },
  draft: { value: 0, percentage: 0 },
  delete: { value: 0, percentage: 0 },
}
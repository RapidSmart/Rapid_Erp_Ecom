import type { Rak, RakOverview } from '../types/rak.types'

export const MOCK_RAK: Rak[] = [
  {
    id: 'rak-1' as any,
    code: 'RED',
    name: 'Red',
    description: 'Vibrant primary tone often used for alerts and emphasis.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'rak-2' as any,
    code: 'BLUE',
    name: 'Blue',
    description: 'Cool primary tone widely used in corporate branding.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'rak-3' as any,
    code: 'GREEN',
    name: 'Green',
    description: 'Fresh tone associated with growth and success.',
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
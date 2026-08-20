import type { Color, ColorOverview } from '../types/colors.types'

export const MOCK_COLORS: Color[] = [
  {
    id: 'color-1' as any,
    code: 'RED',
    name: 'Red',
    description: 'Vibrant primary color often used for alerts and emphasis.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'color-2' as any,
    code: 'BLUE',
    name: 'Blue',
    description: 'Cool primary color widely used in corporate branding.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'color-3' as any,
    code: 'GREEN',
    name: 'Green',
    description: 'Fresh color associated with growth and success.',
    status: 'inactive',
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_COLORS_OVERVIEW: ColorOverview = {
  total: { value: 3, percentage: 100 },
  active: { value: 2, percentage: 66.6 },
  inactive: { value: 1, percentage: 33.3 },
  draft: { value: 0, percentage: 0 },
  delete: { value: 0, percentage: 0 },
}
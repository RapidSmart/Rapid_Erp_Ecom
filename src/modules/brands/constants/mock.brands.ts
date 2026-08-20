import type { Brand, BrandOverview } from '../types/brands.types'

export const MOCK_BRANDS: Brand[] = [
  {
    id: 'brand-1' as any,
    code: 'TECH',
    name: 'Technology',
    description: 'Software, hardware, and IT services.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-2' as any,
    code: 'HEALTH',
    name: 'Healthcare',
    description: 'Medical services, hospitals, and clinics.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'brand-3' as any,
    code: 'EDU',
    name: 'Education',
    description: 'Schools, universities, and training centers.',
    status: 'inactive',
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_BRANDS_OVERVIEW: BrandOverview = {
  total: { value: 3, percentage: 100 },
  active: { value: 2, percentage: 66.6 },
  inactive: { value: 1, percentage: 33.3 },
  draft: { value: 0, percentage: 0 },
  delete: { value: 0, percentage: 0 },
}

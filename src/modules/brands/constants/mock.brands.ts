import type { Industry, IndustryOverview } from '../types/industries.types'

export const MOCK_INDUSTRIES: Industry[] = [
  {
    id: 'ind-1' as any,
    code: 'TECH',
    name: 'Technology',
    description: 'Software, hardware, and IT services.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ind-2' as any,
    code: 'HEALTH',
    name: 'Healthcare',
    description: 'Medical services, hospitals, and clinics.',
    status: 'active',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ind-3' as any,
    code: 'EDU',
    name: 'Education',
    description: 'Schools, universities, and training centers.',
    status: 'inactive',
    updatedAt: new Date().toISOString(),
  },
]

export const MOCK_INDUSTRIES_OVERVIEW: IndustryOverview = {
  total: { value: 3, percentage: 100 },
  active: { value: 2, percentage: 66.6 },
  inactive: { value: 1, percentage: 33.3 },
  draft: { value: 0, percentage: 0 },
  delete: { value: 0, percentage: 0 },
}

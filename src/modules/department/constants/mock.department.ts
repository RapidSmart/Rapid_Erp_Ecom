import type {
  Department,
  DepartmentId,
  DepartmentOverview,
  DepartmentStatus,
  DepartmentTimeRange,
} from '../types/department.types'

interface DepartmentSeed {
  code: string
  name: string
  description: string
  status: DepartmentStatus
  imageUrl: string
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const DEPARTMENT_SEED: readonly DepartmentSeed[] = [
  {
    code: 'ENG',
    name: 'Engineering',
    description: 'Software development, DevOps, platform engineering, and quality assurance.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 2 * 60,
  },
  {
    code: 'MKTG',
    name: 'Marketing',
    description: 'Brand strategy, content creation, social media growth, and performance ads.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 380 * MINUTES_PER_DAY,
  },
  {
    code: 'SALES',
    name: 'Sales & Account Management',
    description: 'Enterprise sales, lead qualification, client relationships, and business development.',
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 4 * 60,
  },
  {
    code: 'HR',
    name: 'Human Resources',
    description: 'Talent acquisition, employee experience, payroll operations, and compliance.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 5 * 60,
  },
  {
    code: 'FIN',
    name: 'Finance & Accounting',
    description: 'Financial reporting, bookkeeping, budget planning, auditing, and tax compliance.',
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 400 * MINUTES_PER_DAY,
  },
  {
    code: 'OPS',
    name: 'Operations & Supply Chain',
    description: 'Warehouse coordination, vendor management, inventory logistics, and procurement.',
    status: 'delete',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 800 * MINUTES_PER_DAY,
  },
  {
    code: 'LEGAL',
    name: 'Legal & Corporate Affairs',
    description: 'Contract reviews, corporate governance, intellectual property, and data privacy.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 30 * MINUTES_PER_DAY,
  },
  {
    code: 'SUPP',
    name: 'Customer Support',
    description: '24/7 technical customer support, ticketing assistance, and helpdesk operations.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 10 * 60,
  },
]

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

export function createMockDepartments(): Department[] {
  return DEPARTMENT_SEED.map((seed) => ({
    code: seed.code as DepartmentId,
    name: seed.name,
    description: seed.description,
    status: seed.status,
    imageUrl: seed.imageUrl,
    updatedAt: minutesAgo(seed.updatedMinutesAgo),
  }))
}

export const MOCK_DEPARTMENT_OVERVIEW: Record<
  DepartmentTimeRange,
  DepartmentOverview
> = {
  live: {
    total: { value: 8, percentage: 100 },
    active: { value: 5, percentage: 62.5 },
    inactive: { value: 1, percentage: 12.5 },
    draft: { value: 1, percentage: 12.5 },
    delete: { value: 1, percentage: 12.5 },
  },
  '6h': {
    total: { value: 8, percentage: 100 },
    active: { value: 4, percentage: 50 },
    inactive: { value: 2, percentage: 25 },
    draft: { value: 1, percentage: 12.5 },
    delete: { value: 1, percentage: 12.5 },
  },
  '24h': {
    total: { value: 8, percentage: 100 },
    active: { value: 5, percentage: 62.5 },
    inactive: { value: 1, percentage: 12.5 },
    draft: { value: 1, percentage: 12.5 },
    delete: { value: 1, percentage: 12.5 },
  },
  '7d': {
    total: { value: 8, percentage: 100 },
    active: { value: 5, percentage: 62.5 },
    inactive: { value: 1, percentage: 12.5 },
    draft: { value: 1, percentage: 12.5 },
    delete: { value: 1, percentage: 12.5 },
  },
  '30d': {
    total: { value: 8, percentage: 100 },
    active: { value: 5, percentage: 62.5 },
    inactive: { value: 1, percentage: 12.5 },
    draft: { value: 1, percentage: 12.5 },
    delete: { value: 1, percentage: 12.5 },
  },
}

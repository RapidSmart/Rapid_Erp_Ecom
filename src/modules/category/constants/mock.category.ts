import type {
  Category,
  CategoryId,
  CategoryOverview,
  CategoryStatus,
  CategoryTimeRange,
} from '../types/category.types'

interface CategorySeed {
  code: string
  name: string
  description: string
  status: CategoryStatus
  imageUrl: string
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const CATEGORY_SEED: readonly CategorySeed[] = [
  {
    code: 'ELEC',
    name: 'Electronics',
    description: 'Electronic gadgets, smart devices, hardware components, and accessories.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 2 * 60,
  },
  {
    code: 'FURN',
    name: 'Furniture',
    description: 'Office desks, ergonomic chairs, cabinets, sofas, and home decor items.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 380 * MINUTES_PER_DAY,
  },
  {
    code: 'APPR',
    name: 'Apparel',
    description: 'Clothing, activewear, sportswear, footwear, and fashion accessories.',
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 4 * 60,
  },
  {
    code: 'BOOK',
    name: 'Books',
    description: 'Educational textbooks, fiction novels, references, and digital journals.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 5 * 60,
  },
  {
    code: 'SPRT',
    name: 'Sports',
    description: 'Fitness gears, outdoor recreation gear, sporting accessories, and supplements.',
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 400 * MINUTES_PER_DAY,
  },
  {
    code: 'OFFC',
    name: 'Office Supplies',
    description: 'Stationeries, printer papers, folders, binders, writing tools, and desk organizers.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 6 * 60,
  },
]

export function createMockCategories(): Category[] {
  const now = Date.now()

  return CATEGORY_SEED.map((seed) => ({
    code: seed.code as CategoryId,
    name: seed.name,
    description: seed.description,
    status: seed.status,
    imageUrl: seed.imageUrl,
    updatedAt: new Date(now - seed.updatedMinutesAgo * 60_000).toISOString(),
  }))
}

export const MOCK_CATEGORY_OVERVIEW: Record<CategoryTimeRange, CategoryOverview> = {
  live: {
    total: { value: 6, percentage: 8 },
    active: { value: 4, percentage: 67 },
    inactive: { value: 1, percentage: 17 },
    draft: { value: 1, percentage: 17 },
    delete: { value: 0, percentage: 0 },
  },
  '6h': {
    total: { value: 10, percentage: 12 },
    active: { value: 7, percentage: 70 },
    inactive: { value: 2, percentage: 20 },
    draft: { value: 1, percentage: 10 },
    delete: { value: 0, percentage: 0 },
  },
  '24h': {
    total: { value: 25, percentage: 15 },
    active: { value: 18, percentage: 72 },
    inactive: { value: 4, percentage: 16 },
    draft: { value: 2, percentage: 8 },
    delete: { value: 1, percentage: 4 },
  },
  '7d': {
    total: { value: 80, percentage: 22 },
    active: { value: 58, percentage: 73 },
    inactive: { value: 12, percentage: 15 },
    draft: { value: 8, percentage: 10 },
    delete: { value: 2, percentage: 2 },
  },
  '30d': {
    total: { value: 240, percentage: 30 },
    active: { value: 175, percentage: 73 },
    inactive: { value: 35, percentage: 15 },
    draft: { value: 20, percentage: 8 },
    delete: { value: 10, percentage: 4 },
  },
}

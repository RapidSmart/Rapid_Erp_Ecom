import type {
  SubCategory,
  SubCategoryId,
  SubCategoryOverview,
  SubCategoryStatus,
  SubCategoryTimeRange,
} from '../types/sub-category.types'

interface SubCategorySeed {
  code: string
  name: string
  description: string
  status: SubCategoryStatus
  imageUrl: string
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const SUB_CATEGORY_SEED: readonly SubCategorySeed[] = [
  {
    code: 'SMART',
    name: 'Smartphones',
    description: 'Flagship mobile phones, budget devices, and screen protectors.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 2 * 60,
  },
  {
    code: 'AUDIO',
    name: 'Wireless Audio',
    description: 'Noise cancelling earbuds, bluetooth studio speakers, and wireless headsets.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 380 * MINUTES_PER_DAY,
  },
  {
    code: 'CHAIR',
    name: 'Ergonomic Chairs',
    description: 'Mesh lumbar chairs, executive reclining seating, and office stools.',
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1580481077197-98c98573c28c?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 4 * 60,
  },
  {
    code: 'SHOES',
    name: 'Running Footwear',
    description: 'Trail running sneakers, athletic training shoes, and walking cushions.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 5 * 60,
  },
  {
    code: 'SHIRT',
    name: 'Casual Apparel',
    description: 'Cotton crewneck t-shirts, polo shirts, and active athletic jerseys.',
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 400 * MINUTES_PER_DAY,
  },
  {
    code: 'NOVEL',
    name: 'Fiction & Literature',
    description: 'Best-selling novels, fantasy series, and contemporary literature books.',
    status: 'delete',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 800 * MINUTES_PER_DAY,
  },
  {
    code: 'DESK',
    name: 'Standing Desks',
    description: 'Electric dual-motor standing desks, motorized risers, and wooden table tops.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 30 * MINUTES_PER_DAY,
  },
  {
    code: 'LIGHT',
    name: 'Smart Lighting',
    description: 'RGB ambient LED light bars, dimmable monitor desk lamps, and smart bulbs.',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 10 * 60,
  },
]

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

export function createMockSubCategories(): SubCategory[] {
  return SUB_CATEGORY_SEED.map((seed) => ({
    code: seed.code as SubCategoryId,
    name: seed.name,
    description: seed.description,
    status: seed.status,
    imageUrl: seed.imageUrl,
    updatedAt: minutesAgo(seed.updatedMinutesAgo),
  }))
}

export const MOCK_SUB_CATEGORY_OVERVIEW: Record<
  SubCategoryTimeRange,
  SubCategoryOverview
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

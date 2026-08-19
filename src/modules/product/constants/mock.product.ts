import type {
  Product,
  ProductId,
  ProductOverview,
  ProductStatus,
  ProductTimeRange,
} from '../types/product.types'

interface ProductSeed {
  name: string
  sku: string
  price: number
  category: string
  status: ProductStatus
  stock: number
  imageUrl: string
  updatedMinutesAgo: number
}

const MINUTES_PER_DAY = 60 * 24

const PRODUCT_SEED: readonly ProductSeed[] = [
  {
    name: 'Mechanical Keyboard',
    sku: 'KB-MECH-87',
    price: 89.99,
    category: 'electronics',
    status: 'active',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 2 * 60,
  },
  {
    name: 'Wireless Gaming Mouse',
    sku: 'MS-WRLS-G',
    price: 49.99,
    category: 'electronics',
    status: 'active',
    stock: 250,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 380 * MINUTES_PER_DAY,
  },
  {
    name: 'Noise Cancelling Headphones',
    sku: 'HP-ANC-200',
    price: 199.99,
    category: 'electronics',
    status: 'inactive',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 4 * 60,
  },
  {
    name: 'Developer Laptop',
    sku: 'LP-DEV-16',
    price: 1499.99,
    category: 'electronics',
    status: 'active',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1496181130204-7552cc1454b4?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 5 * 60,
  },
  {
    name: 'Ergonomic Office Chair',
    sku: 'CH-ERGO-01',
    price: 299.99,
    category: 'furniture',
    status: 'draft',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 400 * MINUTES_PER_DAY,
  },
  {
    name: 'Smart Desk Lamp',
    sku: 'LM-DSK-02',
    price: 39.99,
    category: 'furniture',
    status: 'active',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 6 * 60,
  },
  {
    name: 'Travel Backpack',
    sku: 'BP-TRVL-40',
    price: 79.99,
    category: 'apparel',
    status: 'active',
    stock: 95,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 420 * MINUTES_PER_DAY,
  },
  {
    name: 'Sport Running Shoes',
    sku: 'SH-RUN-09',
    price: 120.00,
    category: 'apparel',
    status: 'inactive',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 14 * MINUTES_PER_DAY,
  },
  {
    name: 'Leather Wallet',
    sku: 'WA-LTHR-03',
    price: 34.99,
    category: 'apparel',
    status: 'active',
    stock: 180,
    imageUrl: 'https://images.unsplash.com/photo-1627124789726-5a4af47594d7?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 440 * MINUTES_PER_DAY,
  },
  {
    name: 'Solid Wood Coffee Table',
    sku: 'TB-COF-WD',
    price: 189.99,
    category: 'furniture',
    status: 'active',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2df114f11?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 25,
  },
  {
    name: 'Classic Hardcover Notebook',
    sku: 'NB-HC-05',
    price: 14.99,
    category: 'office',
    status: 'active',
    stock: 400,
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 40,
  },
  {
    name: 'Vacuum Insulated Water Bottle',
    sku: 'BT-VAC-32',
    price: 24.99,
    category: 'office',
    status: 'draft',
    stock: 320,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    updatedMinutesAgo: 30 * 60,
  },
]

export function createMockProducts(): Product[] {
  const now = Date.now()

  return PRODUCT_SEED.map((seed, index) => ({
    id: `product-${index + 1}` as ProductId,
    name: seed.name,
    sku: seed.sku,
    price: seed.price,
    category: seed.category,
    status: seed.status,
    stock: seed.stock,
    imageUrl: seed.imageUrl,
    updatedAt: new Date(now - seed.updatedMinutesAgo * 60_000).toISOString(),
  }))
}

export const MOCK_PRODUCT_OVERVIEW: Record<ProductTimeRange, ProductOverview> = {
  live: {
    total: { value: 12, percentage: 8 },
    active: { value: 8, percentage: 66 },
    inactive: { value: 2, percentage: 17 },
    draft: { value: 2, percentage: 17 },
    delete: { value: 0, percentage: 0 },
  },
  '6h': {
    total: { value: 20, percentage: 10 },
    active: { value: 14, percentage: 70 },
    inactive: { value: 3, percentage: 15 },
    draft: { value: 2, percentage: 10 },
    delete: { value: 1, percentage: 5 },
  },
  '24h': {
    total: { value: 50, percentage: 15 },
    active: { value: 35, percentage: 70 },
    inactive: { value: 8, percentage: 16 },
    draft: { value: 5, percentage: 10 },
    delete: { value: 2, percentage: 4 },
  },
  '7d': {
    total: { value: 150, percentage: 22 },
    active: { value: 110, percentage: 73 },
    inactive: { value: 20, percentage: 13 },
    draft: { value: 15, percentage: 10 },
    delete: { value: 5, percentage: 4 },
  },
  '30d': {
    total: { value: 450, percentage: 30 },
    active: { value: 320, percentage: 71 },
    inactive: { value: 60, percentage: 13 },
    draft: { value: 50, percentage: 11 },
    delete: { value: 20, percentage: 5 },
  },
}

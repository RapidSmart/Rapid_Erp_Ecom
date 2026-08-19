import type { ProductFormValues, ImageGalleryItem, SelectOption } from '../types/product.types'

export const IMAGE_GALLERY: readonly ImageGalleryItem[] = [
  {
    label: 'Mechanical Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Wireless Gaming Mouse',
    url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Noise Cancelling Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Developer Laptop',
    url: 'https://images.unsplash.com/photo-1496181130204-7552cc1454b4?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Ergonomic Office Chair',
    url: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Smart Desk Lamp',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Travel Backpack',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sport Running Shoes',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
] as const

export const CATEGORY_OPTIONS: readonly SelectOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'books', label: 'Books' },
  { value: 'sports', label: 'Sports' },
  { value: 'office', label: 'Office Supplies' },
] as const

export const STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const FEATURED_OPTIONS: readonly SelectOption[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
] as const

export const REQUIRED_FIELDS: readonly (keyof ProductFormValues)[] = [
  'sku',
  'name',
  'price',
  'category',
  'stock',
] as const

export const MOCK_EDIT_PRODUCT: ProductFormValues = {
  sku: 'KB-MECH-87',
  name: 'Mechanical Keyboard',
  price: '89.99',
  category: 'electronics',
  stock: '120',
  status: 'active',
  featured: 'yes',
  imageFile: null,
  selectedImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
  description: 'Premium tenkeyless mechanical keyboard with hot-swappable tactile switches.',
}

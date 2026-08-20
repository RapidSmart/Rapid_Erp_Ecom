import type { SubCategoryFormValues, ImageGalleryItem, SelectOption } from '../types/sub-category.types'

export const IMAGE_GALLERY: readonly ImageGalleryItem[] = [
  {
    label: 'Smartphones & Mobile',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Ergonomic Chairs',
    url: 'https://images.unsplash.com/photo-1580481077197-98c98573c28c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Casual T-Shirts',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Wireless Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Running Shoes',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Fiction & Novels',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
  },
] as const

export const STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const REQUIRED_FIELDS: readonly (keyof SubCategoryFormValues)[] = [
  'code',
  'name',
  'description',
] as const

export const MOCK_EDIT_SUB_CATEGORY: SubCategoryFormValues = {
  code: 'SMART',
  name: 'Smartphones & Mobile',
  description: 'Latest Android & iOS mobile devices, flagship phones, and accessories.',
  status: 'active',
  imageFile: null,
  selectedImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
}

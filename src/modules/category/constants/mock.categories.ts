import type { CategoryFormValues, ImageGalleryItem, SelectOption } from '../types/category.types'

export const IMAGE_GALLERY: readonly ImageGalleryItem[] = [
  {
    label: 'Electronics Category',
    url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Furniture Category',
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Apparel Category',
    url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Books Category',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sports Category',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Office Category',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
] as const

export const STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const REQUIRED_FIELDS: readonly (keyof CategoryFormValues)[] = [
  'code',
  'name',
  'description',
] as const

export const MOCK_EDIT_CATEGORY: CategoryFormValues = {
  code: 'ELEC',
  name: 'Electronics',
  description: 'Electronic gadgets, hardware devices, computer components, and accessories.',
  status: 'active',
  imageFile: null,
  selectedImage: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
}

import type { DepartmentFormValues, ImageGalleryItem, SelectOption } from '../types/department.types'

export const IMAGE_GALLERY: readonly ImageGalleryItem[] = [
  {
    label: 'Engineering Department',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Executive & Strategy',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sales & Marketing',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Human Resources',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Finance & Accounting',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Logistics & Supply',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  },
] as const

export const STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const REQUIRED_FIELDS: readonly (keyof DepartmentFormValues)[] = [
  'code',
  'name',
  'description',
] as const

export const MOCK_EDIT_DEPARTMENT: DepartmentFormValues = {
  code: 'ENG',
  name: 'Engineering',
  description: 'Software engineering, cloud infrastructure, quality assurance, and architecture teams.',
  status: 'active',
  imageFile: null,
  selectedImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
}

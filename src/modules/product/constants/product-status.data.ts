import type { ProductStatus } from '../types/product.types'

export interface ProductStatusOption {
  value: ProductStatus
  labelKey: string
}

export const PRODUCT_STATUS_OPTIONS: readonly ProductStatusOption[] = [
  { value: 'active', labelKey: 'product.status.active' },
  { value: 'inactive', labelKey: 'product.status.inactive' },
  { value: 'draft', labelKey: 'product.status.draft' },
  { value: 'delete', labelKey: 'product.status.delete' },
]

export const DEFAULT_PRODUCT_STATUS: ProductStatus = 'active'

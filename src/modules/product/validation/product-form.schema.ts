import type { ProductPayload } from '../types/product.types'

export type ProductFormField =
  | 'name'
  | 'sku'
  | 'price'
  | 'category'
  | 'stock'

export type ProductFormErrors = Partial<Record<ProductFormField, string>>

const SKU_PATTERN = /^[A-Za-z0-9-_]{3,30}$/
const PRICE_PATTERN = /^\d+(\.\d{1,2})?$/
const STOCK_PATTERN = /^\d+$/

export function normalizeProductPayload(values: ProductPayload): ProductPayload {
  return {
    name: values.name.trim(),
    sku: values.sku.trim().toUpperCase(),
    price: Number(values.price),
    category: values.category.trim(),
    status: values.status,
    stock: Number(values.stock),
    imageUrl: values.imageUrl.trim(),
  }
}

export function validateProductForm(values: ProductPayload): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (values.name.trim().length === 0) {
    errors.name = 'product.form.errors.nameRequired'
  }

  if (!SKU_PATTERN.test(values.sku.trim())) {
    errors.sku = 'product.form.errors.skuFormat'
  }

  const priceStr = String(values.price).trim()
  if (!PRICE_PATTERN.test(priceStr) || Number(priceStr) <= 0) {
    errors.price = 'product.form.errors.priceFormat'
  }

  if (values.category.trim().length === 0) {
    errors.category = 'product.form.errors.categoryRequired'
  }

  const stockStr = String(values.stock).trim()
  if (!STOCK_PATTERN.test(stockStr)) {
    errors.stock = 'product.form.errors.stockFormat'
  }

  return errors
}

import { useState, type FormEvent } from 'react'
import { DEFAULT_PRODUCT_STATUS } from '../constants/product-status.data'
import {
  normalizeProductPayload,
  validateProductForm,
  type ProductFormErrors,
  type ProductFormField,
} from '../validation/product-form.schema'
import type {
  Product,
  ProductError,
  ProductFormMode,
  ProductPayload,
  ProductStatus,
} from '../types/product.types'

export interface UseProductFormOptions {
  mode: ProductFormMode
  product?: Product
  onSubmit: (payload: ProductPayload) => Promise<ProductError | null>
  onSuccess: () => void
}

export interface ProductFormController {
  values: ProductPayload
  errors: ProductFormErrors
  /** Non field-specific failure returned by the service. */
  formError: string | null
  setText: (field: ProductFormField, value: string | number) => void
  setStatus: (status: ProductStatus) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function buildInitialValues(
  mode: ProductFormMode,
  product?: Product
): ProductPayload {
  if (product && mode === 'edit') {
    return {
      sku: product.sku,
      name: product.name,
      price: product.price,
      category: product.category,
      status: product.status,
      stock: product.stock,
      imageUrl: product.imageUrl,
    }
  }

  if (product && mode === 'duplicate') {
    // SKU must be unique, so clear it for duplicate.
    return {
      sku: '',
      name: product.name,
      price: product.price,
      category: product.category,
      status: product.status,
      stock: product.stock,
      imageUrl: product.imageUrl,
    }
  }

  return {
    sku: '',
    name: '',
    price: 0,
    category: '',
    status: DEFAULT_PRODUCT_STATUS,
    stock: 0,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
  }
}

export function useProductForm({
  mode,
  product,
  onSubmit,
  onSuccess,
}: UseProductFormOptions): ProductFormController {
  const [values, setValues] = useState<ProductPayload>(() =>
    buildInitialValues(mode, product)
  )
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function setText(field: ProductFormField, value: string | number) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  function setStatus(status: ProductStatus) {
    setValues((current) => ({ ...current, status }))
    setFormError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = normalizeProductPayload(values)
    const validationErrors = validateProductForm(payload)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setErrors({})
    setFormError(null)

    void onSubmit(payload).then((error) => {
      if (!error) {
        onSuccess()

        return
      }

      if (error.code === 'product/duplicate-sku') {
        setErrors({ sku: 'product.form.errors.duplicateSku' })

        return
      }

      setFormError(error.message)
    })
  }

  return { values, errors, formError, setText, setStatus, handleSubmit }
}

import { useState, useCallback, useEffect } from 'react'
import type { DragEvent } from 'react'
import type {
  ProductFormValues,
  UseProductPageFormOptions,
  UseProductPageFormReturn,
} from '../types/product.types'
import {
  IMAGE_GALLERY,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  FEATURED_OPTIONS,
  REQUIRED_FIELDS,
} from '../constants/mock.products'
import { productService } from '../services/product.service'
import type { ProductFormInput } from '../validation/product-page.schema'

const INITIAL_VALUES: ProductFormValues = {
  sku: '',
  name: '',
  price: '',
  category: '',
  stock: '',
  status: 'active',
  featured: '',
  imageFile: null,
  selectedImage: null,
  description: '',
}

export function useProductPageForm(options?: UseProductPageFormOptions): UseProductPageFormReturn {
  const [values, setValues] = useState<ProductFormValues>(() => ({
    ...INITIAL_VALUES,
    ...options?.initialValues,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.isEditMode && options?.id))

  useEffect(() => {
    if (options?.isEditMode && options?.id) {
      setIsLoading(true)
      productService
        .getProductById(options.id)
        .then((fetchedData) => {
          setValues((prev) => ({
            ...prev,
            ...fetchedData,
          }))
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (options?.initialValues) {
      setValues((prev) => ({
        ...prev,
        ...options.initialValues,
      }))
    }
  }, [options?.id, options?.isEditMode, options?.initialValues])

  const filledRequiredCount = REQUIRED_FIELDS.filter((field) => {
    const value = values[field]
    if (typeof value === 'string') return value.trim().length > 0
    return value !== null
  }).length

  const handleFieldChange = useCallback(
    <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const handleImageUpload = useCallback((file: File) => {
    setValues((prev) => ({ ...prev, imageFile: file, selectedImage: null }))
  }, [])

  const handleImageSelect = useCallback((url: string) => {
    setValues((prev) => ({
      ...prev,
      selectedImage: prev.selectedImage === url ? null : url,
      imageFile: null,
    }))
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file?.type.startsWith('image/')) {
        handleImageUpload(file)
      }
    },
    [handleImageUpload],
  )

  const handleClear = useCallback(() => {
    setValues(options?.initialValues ? { ...INITIAL_VALUES, ...options.initialValues } : INITIAL_VALUES)
  }, [options?.initialValues])

  const handleSave = useCallback(() => {
    const payload: ProductFormInput = {
      sku: values.sku,
      name: values.name,
      price: values.price,
      category: values.category,
      stock: values.stock,
      status: values.status,
      featured: values.featured,
      selectedImage: values.selectedImage,
      description: values.description,
    }

    if (options?.isEditMode && options?.id) {
      productService.updateProduct(options.id, payload).catch((err: unknown) => {
        console.error('Failed to update product', err)
      })
    } else {
      productService.createProduct(payload).catch((err: unknown) => {
        console.error('Failed to create product', err)
      })
    }
  }, [options?.id, options?.isEditMode, values])

  const handleDuplicate = useCallback(() => {
    void Promise.resolve(values)
  }, [values])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount: REQUIRED_FIELDS.length,
    imageGallery: IMAGE_GALLERY,
    categoryOptions: CATEGORY_OPTIONS,
    statusOptions: STATUS_OPTIONS,
    featuredOptions: FEATURED_OPTIONS,
    handleFieldChange,
    handleImageUpload,
    handleImageSelect,
    handleDragOver,
    handleDrop,
    handleClear,
    handleSave,
    handleDuplicate,
    handlePrint,
  }
}

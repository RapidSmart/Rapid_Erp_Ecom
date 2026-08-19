import { useState, useCallback, useEffect } from 'react'
import type { DragEvent } from 'react'
import type {
  CategoryFormValues,
  UseCategoryPageFormOptions,
  UseCategoryPageFormReturn,
} from '../types/category.types'
import {
  IMAGE_GALLERY,
  STATUS_OPTIONS,
  REQUIRED_FIELDS,
} from '../constants/mock.categories'
import { categoryService } from '../services/category.service'
import type { CategoryFormInput } from '../validation/category-page.schema'

const INITIAL_VALUES: CategoryFormValues = {
  code: '',
  name: '',
  description: '',
  status: 'active',
  imageFile: null,
  selectedImage: null,
}

export function useCategoryPageForm(options?: UseCategoryPageFormOptions): UseCategoryPageFormReturn {
  const [values, setValues] = useState<CategoryFormValues>(() => ({
    ...INITIAL_VALUES,
    ...options?.initialValues,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.isEditMode && options?.code))

  useEffect(() => {
    if (options?.isEditMode && options?.code) {
      setIsLoading(true)
      categoryService
        .getCategoryByCode(options.code)
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
  }, [options?.code, options?.isEditMode, options?.initialValues])

  const filledRequiredCount = REQUIRED_FIELDS.filter((field) => {
    const value = values[field]
    if (typeof value === 'string') return value.trim().length > 0
    return value !== null
  }).length

  const handleFieldChange = useCallback(
    <K extends keyof CategoryFormValues>(field: K, value: CategoryFormValues[K]) => {
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
    const payload: CategoryFormInput = {
      code: values.code,
      name: values.name,
      description: values.description,
      status: values.status,
      selectedImage: values.selectedImage,
    }

    if (options?.isEditMode && options?.code) {
      categoryService.updateCategory(options.code, payload).catch((err: unknown) => {
        console.error('Failed to update category', err)
      })
    } else {
      categoryService.createCategory(payload).catch((err: unknown) => {
        console.error('Failed to create category', err)
      })
    }
  }, [options?.code, options?.isEditMode, values])

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
    statusOptions: STATUS_OPTIONS,
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

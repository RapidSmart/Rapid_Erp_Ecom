import { useState, useCallback, useEffect } from 'react'
import type { DragEvent } from 'react'
import type {
  DepartmentFormValues,
  UseDepartmentPageFormOptions,
  UseDepartmentPageFormReturn,
} from '../types/department.types'
import {
  IMAGE_GALLERY,
  STATUS_OPTIONS,
  REQUIRED_FIELDS,
} from '../constants/mock.departments'
import { departmentService } from '../services/department.service'
import type { DepartmentFormInput } from '../validation/department-page.schema'

const INITIAL_VALUES: DepartmentFormValues = {
  code: '',
  name: '',
  description: '',
  status: 'active',
  imageFile: null,
  selectedImage: null,
}

export function useDepartmentPageForm(options?: UseDepartmentPageFormOptions): UseDepartmentPageFormReturn {
  const [values, setValues] = useState<DepartmentFormValues>(() => ({
    ...INITIAL_VALUES,
    ...options?.initialValues,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.isEditMode && options?.code))

  useEffect(() => {
    if (options?.isEditMode && options?.code) {
      setIsLoading(true)
      departmentService
        .getDepartmentByCode(options.code)
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
    <K extends keyof DepartmentFormValues>(field: K, value: DepartmentFormValues[K]) => {
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
    const payload: DepartmentFormInput = {
      code: values.code,
      name: values.name,
      description: values.description,
      status: values.status,
      selectedImage: values.selectedImage,
    }

    if (options?.isEditMode && options?.code) {
      departmentService.updateDepartment(options.code, payload).catch((err: unknown) => {
        console.error('Failed to update department', err)
      })
    } else {
      departmentService.createDepartment(payload).catch((err: unknown) => {
        console.error('Failed to create department', err)
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

import { useState, type FormEvent } from 'react'
import { DEFAULT_STATUS } from '@/modules/common-data'
import { normalizeCategoryPayload, validateCategoryForm } from '../validation/category-form.schema'
import type {
  Category,
  CategoryFormMode,
  CategoryPayload,
  CategoryStatus,
  CategoryFormErrors,
  CategoryFormField,
  UseCategoryFormOptions,
  CategoryFormController,
} from '../types/category.types'

function buildInitialValues(
  mode: CategoryFormMode,
  category?: Category
): CategoryPayload {
  if (category && mode === 'edit') {
    return {
      code: category.code,
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl,
    }
  }

  if (category && mode === 'duplicate') {
    // Code must be unique, so clear it.
    return {
      code: '',
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl,
    }
  }

  return {
    code: '',
    name: '',
    description: '',
    status: DEFAULT_STATUS,
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  }
}

export function useCategoryForm({
  mode,
  category,
  onSubmit,
  onSuccess,
}: UseCategoryFormOptions): CategoryFormController {
  const [values, setValues] = useState<CategoryPayload>(() =>
    buildInitialValues(mode, category)
  )
  const [errors, setErrors] = useState<CategoryFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function setText(field: CategoryFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  function setStatus(status: CategoryStatus) {
    setValues((current) => ({ ...current, status }))
    setFormError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = normalizeCategoryPayload(values)
    const validationErrors = validateCategoryForm(payload)

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

      if (error.code === 'category/duplicate-code') {
        setErrors({ code: 'category.form.errors.duplicateCode' })

        return
      }

      setFormError(error.message)
    })
  }

  return { values, errors, formError, setText, setStatus, handleSubmit }
}

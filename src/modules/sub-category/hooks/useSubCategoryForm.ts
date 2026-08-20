import { useState, type FormEvent } from 'react'
import { DEFAULT_SUB_CATEGORY_STATUS } from '../constants/sub-category-status.data'
import { normalizeSubCategoryPayload, validateSubCategoryForm } from '../validation/sub-category-form.schema'
import type {
  SubCategory,
  SubCategoryFormMode,
  SubCategoryPayload,
  SubCategoryStatus,
  SubCategoryFormErrors,
  SubCategoryFormField,
  UseSubCategoryFormOptions,
  SubCategoryFormController,
} from '../types/sub-category.types'

function buildInitialValues(
  mode: SubCategoryFormMode,
  subCategory?: SubCategory
): SubCategoryPayload {
  if (subCategory && mode === 'edit') {
    return {
      code: subCategory.code,
      name: subCategory.name,
      description: subCategory.description,
      status: subCategory.status,
      imageUrl: subCategory.imageUrl,
    }
  }

  if (subCategory && mode === 'duplicate') {
    return {
      code: '',
      name: subCategory.name,
      description: subCategory.description,
      status: subCategory.status,
      imageUrl: subCategory.imageUrl,
    }
  }

  return {
    code: '',
    name: '',
    description: '',
    status: DEFAULT_SUB_CATEGORY_STATUS,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  }
}

export function useSubCategoryForm({
  mode,
  subCategory,
  onSubmit,
  onSuccess,
}: UseSubCategoryFormOptions): SubCategoryFormController {
  const [values, setValues] = useState<SubCategoryPayload>(() =>
    buildInitialValues(mode, subCategory)
  )
  const [errors, setErrors] = useState<SubCategoryFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function setText(field: SubCategoryFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  function setStatus(status: SubCategoryStatus) {
    setValues((current) => ({ ...current, status }))
    setFormError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = normalizeSubCategoryPayload(values)
    const validationErrors = validateSubCategoryForm(payload)

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

      if (error.code === 'subCategory/duplicate-code') {
        setErrors({ code: 'subCategory.form.errors.duplicateCode' })

        return
      }

      setFormError(error.message)
    })
  }

  return { values, errors, formError, setText, setStatus, handleSubmit }
}

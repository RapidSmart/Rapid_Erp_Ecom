import type { CategoryPayload } from '../types/category.types'

export type CategoryFormField =
  | 'code'
  | 'name'
  | 'description'

export type CategoryFormErrors = Partial<Record<CategoryFormField, string>>

const CODE_PATTERN = /^[A-Za-z0-9-_]{2,10}$/

export function normalizeCategoryPayload(values: CategoryPayload): CategoryPayload {
  return {
    code: values.code.trim().toUpperCase(),
    name: values.name.trim(),
    description: values.description.trim(),
    imageUrl: values.imageUrl.trim(),
    status: values.status,
  }
}

export function validateCategoryForm(values: CategoryPayload): CategoryFormErrors {
  const errors: CategoryFormErrors = {}

  const codeVal = values.code.trim()
  if (!CODE_PATTERN.test(codeVal)) {
    errors.code = 'category.form.errors.codeFormat'
  }

  const nameVal = values.name.trim()
  if (nameVal.length === 0) {
    errors.name = 'category.form.errors.nameRequired'
  } else if (nameVal.length > 40) {
    errors.name = 'category.form.errors.nameLength'
  }

  const descVal = values.description.trim()
  if (descVal.length === 0) {
    errors.description = 'category.form.errors.descriptionRequired'
  } else if (descVal.length > 200) {
    errors.description = 'category.form.errors.descriptionLength'
  }

  return errors
}

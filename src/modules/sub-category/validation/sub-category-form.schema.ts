import type { SubCategoryPayload, SubCategoryFormErrors } from '../types/sub-category.types'

const CODE_PATTERN = /^[A-Za-z0-9-_]{2,10}$/

export function normalizeSubCategoryPayload(values: SubCategoryPayload): SubCategoryPayload {
  return {
    code: values.code.trim().toUpperCase(),
    name: values.name.trim(),
    description: values.description.trim(),
    imageUrl: values.imageUrl.trim(),
    status: values.status,
  }
}

export function validateSubCategoryForm(values: SubCategoryPayload): SubCategoryFormErrors {
  const errors: SubCategoryFormErrors = {}

  const codeVal = values.code.trim()
  if (!CODE_PATTERN.test(codeVal)) {
    errors.code = 'subCategory.form.errors.codeFormat'
  }

  const nameVal = values.name.trim()
  if (nameVal.length === 0) {
    errors.name = 'subCategory.form.errors.nameRequired'
  } else if (nameVal.length > 40) {
    errors.name = 'subCategory.form.errors.nameLength'
  }

  const descVal = values.description.trim()
  if (descVal.length === 0) {
    errors.description = 'subCategory.form.errors.descriptionRequired'
  } else if (descVal.length > 200) {
    errors.description = 'subCategory.form.errors.descriptionLength'
  }

  return errors
}

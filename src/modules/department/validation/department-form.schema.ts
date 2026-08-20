import type { DepartmentPayload, DepartmentFormErrors } from '../types/department.types'

const CODE_PATTERN = /^[A-Za-z0-9-_]{2,10}$/

export function normalizeDepartmentPayload(values: DepartmentPayload): DepartmentPayload {
  return {
    code: values.code.trim().toUpperCase(),
    name: values.name.trim(),
    description: values.description.trim(),
    imageUrl: values.imageUrl.trim(),
    status: values.status,
  }
}

export function validateDepartmentForm(values: DepartmentPayload): DepartmentFormErrors {
  const errors: DepartmentFormErrors = {}

  const codeVal = values.code.trim()
  if (!CODE_PATTERN.test(codeVal)) {
    errors.code = 'department.form.errors.codeFormat'
  }

  const nameVal = values.name.trim()
  if (nameVal.length === 0) {
    errors.name = 'department.form.errors.nameRequired'
  } else if (nameVal.length > 40) {
    errors.name = 'department.form.errors.nameLength'
  }

  const descVal = values.description.trim()
  if (descVal.length === 0) {
    errors.description = 'department.form.errors.descriptionRequired'
  } else if (descVal.length > 200) {
    errors.description = 'department.form.errors.descriptionLength'
  }

  return errors
}

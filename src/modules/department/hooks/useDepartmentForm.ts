import { useState, type FormEvent } from 'react'
import { DEFAULT_STATUS } from '@/modules/common-data'
import { normalizeDepartmentPayload, validateDepartmentForm } from '../validation/department-form.schema'
import type {
  Department,
  DepartmentFormMode,
  DepartmentPayload,
  DepartmentStatus,
  DepartmentFormErrors,
  DepartmentFormField,
  UseDepartmentFormOptions,
  DepartmentFormController,
} from '../types/department.types'

function buildInitialValues(
  mode: DepartmentFormMode,
  department?: Department
): DepartmentPayload {
  if (department && mode === 'edit') {
    return {
      code: department.code,
      name: department.name,
      description: department.description,
      status: department.status,
      imageUrl: department.imageUrl,
    }
  }

  if (department && mode === 'duplicate') {
    return {
      code: '',
      name: department.name,
      description: department.description,
      status: department.status,
      imageUrl: department.imageUrl,
    }
  }

  return {
    code: '',
    name: '',
    description: '',
    status: DEFAULT_STATUS,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  }
}

export function useDepartmentForm({
  mode,
  department,
  onSubmit,
  onSuccess,
}: UseDepartmentFormOptions): DepartmentFormController {
  const [values, setValues] = useState<DepartmentPayload>(() =>
    buildInitialValues(mode, department)
  )
  const [errors, setErrors] = useState<DepartmentFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function setText(field: DepartmentFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  function setStatus(status: DepartmentStatus) {
    setValues((current) => ({ ...current, status }))
    setFormError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = normalizeDepartmentPayload(values)
    const validationErrors = validateDepartmentForm(payload)

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

      if (error.code === 'department/duplicate-code') {
        setErrors({ code: 'department.form.errors.duplicateCode' })

        return
      }

      setFormError(error.message)
    })
  }

  return { values, errors, formError, setText, setStatus, handleSubmit }
}

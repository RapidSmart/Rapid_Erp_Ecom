import { useState, type SubmitEvent } from 'react'
import { DEFAULT_COUNTRY_STATUS } from '../constants/country-status.data'
import {
  normalizeCountryPayload,
  validateCountryForm,
  type CountryFormErrors,
  type CountryFormField,
} from '../validation/country-form.schema'
import type {
  Country,
  CountryError,
  CountryFormMode,
  CountryPayload,
  CountryStatus,
} from '../types/country.types'

export interface UseCountryFormOptions {
  mode: CountryFormMode
  country?: Country
  onSubmit: (payload: CountryPayload) => Promise<CountryError | null>
  onSuccess: () => void
}

export interface CountryFormController {
  values: CountryPayload
  errors: CountryFormErrors
  /** Non field-specific failure returned by the service. */
  formError: string | null
  setText: (field: CountryFormField, value: string) => void
  setStatus: (status: CountryStatus) => void
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

function buildInitialValues(
  mode: CountryFormMode,
  country?: Country
): CountryPayload {
  if (country && mode === 'edit') {
    return {
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      status: country.status,
    }
  }

  if (country && mode === 'duplicate') {
    // ISO codes are unique, so a duplicate always needs fresh ones.
    return {
      name: country.name,
      iso2: '',
      iso3: '',
      status: country.status,
    }
  }

  return {
    name: '',
    iso2: '',
    iso3: '',
    status: DEFAULT_COUNTRY_STATUS,
  }
}

export function useCountryForm({
  mode,
  country,
  onSubmit,
  onSuccess,
}: UseCountryFormOptions): CountryFormController {
  const [values, setValues] = useState<CountryPayload>(() =>
    buildInitialValues(mode, country)
  )
  const [errors, setErrors] = useState<CountryFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function setText(field: CountryFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError(null)
  }

  function setStatus(status: CountryStatus) {
    setValues((current) => ({ ...current, status }))
    setFormError(null)
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = normalizeCountryPayload(values)
    const validationErrors = validateCountryForm(payload)

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

      if (error.code === 'country/duplicate-code') {
        setErrors({ iso2: 'country.form.errors.duplicateCode' })

        return
      }

      setFormError(error.message)
    })
  }

  return { values, errors, formError, setText, setStatus, handleSubmit }
}

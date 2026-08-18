import { useState, useCallback } from 'react'
import type { DragEvent } from 'react'
import type { CountryFormValues, UseCountryFormReturn } from '../types/country.types'
import {
  FLAG_GALLERY,
  CONTINENT_OPTIONS,
  CURRENCY_OPTIONS,
  STATUS_OPTIONS,
  DEFAULT_COUNTRY_OPTIONS,
  REQUIRED_FIELDS,
} from '../constants/mock.countries'
import { countryService } from '../services/country.service'

const INITIAL_VALUES: CountryFormValues = {
  isoCode: '',
  countryName: '',
  diallingCode: '',
  continent: '',
  currency: '',
  status: 'active',
  defaultCountry: 'no',
  flagFile: null,
  selectedFlag: null,
  internalNote: '',
}

export function useCountryForm(): UseCountryFormReturn {
  const [values, setValues] = useState<CountryFormValues>(INITIAL_VALUES)

  const filledRequiredCount = REQUIRED_FIELDS.filter((field) => {
    const value = values[field]
    if (typeof value === 'string') return value.trim().length > 0
    return value !== null
  }).length

  const handleFieldChange = useCallback(
    <K extends keyof CountryFormValues>(field: K, value: CountryFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const handleFlagUpload = useCallback((file: File) => {
    setValues((prev) => ({ ...prev, flagFile: file, selectedFlag: null }))
  }, [])

  const handleFlagSelect = useCallback((code: string) => {
    setValues((prev) => ({
      ...prev,
      selectedFlag: prev.selectedFlag === code ? null : code,
      flagFile: null,
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
        handleFlagUpload(file)
      }
    },
    [handleFlagUpload],
  )

  const handleClear = useCallback(() => {
    setValues(INITIAL_VALUES)
  }, [])

  const handleSave = useCallback(() => {
    // Send form data to service layer
    countryService
      .createCountry({
        isoCode: values.isoCode,
        countryName: values.countryName,
        diallingCode: values.diallingCode,
        continent: values.continent,
        currency: values.currency,
        status: values.status === 'inactive' ? 'inactive' : 'active',
        defaultCountry: values.defaultCountry,
        selectedFlag: values.selectedFlag,
        internalNote: values.internalNote,
      })
      .catch((err: unknown) => {
        // Handled at boundary or logger
        console.error('Failed to create country', err)
      })
  }, [values])

  const handleDuplicate = useCallback(() => {
    void Promise.resolve(values)
  }, [values])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return {
    values,
    filledRequiredCount,
    totalRequiredCount: REQUIRED_FIELDS.length,
    flagGallery: FLAG_GALLERY,
    continentOptions: CONTINENT_OPTIONS,
    currencyOptions: CURRENCY_OPTIONS,
    statusOptions: STATUS_OPTIONS,
    defaultCountryOptions: DEFAULT_COUNTRY_OPTIONS,
    handleFieldChange,
    handleFlagUpload,
    handleFlagSelect,
    handleDragOver,
    handleDrop,
    handleClear,
    handleSave,
    handleDuplicate,
    handlePrint,
  }
}

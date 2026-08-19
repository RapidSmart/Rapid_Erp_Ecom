import { useState, useCallback, useEffect } from 'react'
import type { DragEvent } from 'react'
import type {
  CountryFormValues,
  UseCountryPageFormOptions,
  UseCountryPageFormReturn,
} from '../types/country.types'
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

export function useCountryPageForm(options?: UseCountryPageFormOptions): UseCountryPageFormReturn {
  const [values, setValues] = useState<CountryFormValues>(() => ({
    ...INITIAL_VALUES,
    ...options?.initialValues,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.isEditMode && options?.id))

  useEffect(() => {
    if (options?.isEditMode && options?.id) {
      setIsLoading(true)
      countryService
        .getCountryById(options.id)
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
  }, [options?.id, options?.isEditMode, options?.initialValues])

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
    setValues(options?.initialValues ? { ...INITIAL_VALUES, ...options.initialValues } : INITIAL_VALUES)
  }, [options?.initialValues])

  const handleSave = useCallback(() => {
    const payload: {
      isoCode: string
      countryName: string
      diallingCode: string
      continent: string
      currency: string
      status: 'active' | 'inactive'
      defaultCountry: string
      selectedFlag: string | null
      internalNote: string
    } = {
      isoCode: values.isoCode,
      countryName: values.countryName,
      diallingCode: values.diallingCode,
      continent: values.continent,
      currency: values.currency,
      status: values.status === 'inactive' ? 'inactive' : 'active',
      defaultCountry: values.defaultCountry,
      selectedFlag: values.selectedFlag,
      internalNote: values.internalNote,
    }

    if (options?.isEditMode && options?.id) {
      countryService.updateCountry(options.id, payload).catch((err: unknown) => {
        console.error('Failed to update country', err)
      })
    } else {
      countryService.createCountry(payload).catch((err: unknown) => {
        console.error('Failed to create country', err)
      })
    }
  }, [options?.id, options?.isEditMode, values])

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

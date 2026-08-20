import { useState, useCallback, useEffect } from 'react'
import type { DragEvent } from 'react'
import type {
  CountryFormValues,
  UseCountryPageFormOptions,
  UseCountryPageFormReturn,
} from '../types/country.types'
import {
  FLAG_GALLERY,
  STATUS_OPTIONS,
  REQUIRED_FIELDS,
} from '../constants/mock.countries'
import { useNavigate } from 'react-router-dom'
import { countryService } from '../services/country.service'
import { validateCountryForm } from '../validation/country-form.schema'

const INITIAL_VALUES: CountryFormValues = {
  countryCode: '',
  name: '',
  nativeName: '',
  status: 'active',
  isDefault: false,
  iso2: '',
  iso3: '',
  isoNumeric: '',
  flagFile: null,
  selectedFlag: null,
}

export function useCountryPageForm(options?: UseCountryPageFormOptions): UseCountryPageFormReturn {
  const [values, setValues] = useState<CountryFormValues>(() => ({
    ...INITIAL_VALUES,
    ...options?.initialValues,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(options?.isEditMode && options?.id))
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [stayOnPage, setStayOnPage] = useState(false)
  const navigate = useNavigate()

  const errors = validateCountryForm({
    countryCode: values.countryCode,
    name: values.name,
    nativeName: values.nativeName,
    iso2: values.iso2,
    iso3: values.iso3,
    isoNumeric: values.isoNumeric,
    status: (values.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
    isDefault: values.isDefault,
    selectedFlag: values.selectedFlag,
  })

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
    if (typeof value === 'boolean') return true // booleans are always considered filled
    return value !== null
  }).length

  const handleFieldChange = useCallback(
    <K extends keyof CountryFormValues>(field: K, value: CountryFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }))
      if (touched[field]) {
        // re-validate visually immediately when typing in a touched field
        setTouched((prev) => ({ ...prev, [field]: true }))
      }
    },
    [touched],
  )

  const handleBlur = useCallback((field: keyof CountryFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

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
    const payload = {
      countryCode: values.countryCode,
      name: values.name,
      nativeName: values.nativeName,
      iso2: values.iso2,
      iso3: values.iso3,
      isoNumeric: values.isoNumeric,
      status: (values.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
      isDefault: values.isDefault,
      selectedFlag: values.selectedFlag,
    }

    if (options?.isEditMode && options?.id) {
      countryService.updateCountry(options.id, payload)
        .then(() => {
          if (!stayOnPage) {
            navigate('/country')
          }
        })
        .catch((err: unknown) => {
          console.error('Failed to update country', err)
        })
    } else {
      countryService.createCountry(payload)
        .then(() => {
          if (!stayOnPage) {
            navigate('/country')
          } else {
            handleClear()
          }
        })
        .catch((err: unknown) => {
          console.error('Failed to create country', err)
        })
    }
  }, [options?.id, options?.isEditMode, values, stayOnPage, navigate, handleClear])

  const toggleStayOnPage = useCallback(() => {
    setStayOnPage(prev => !prev)
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return {
    values,
    isLoading,
    filledRequiredCount,
    totalRequiredCount: REQUIRED_FIELDS.length,
    flagGallery: FLAG_GALLERY,
    statusOptions: STATUS_OPTIONS,
    errors,
    touched,
    handleFieldChange,
    handleBlur,
    handleFlagUpload,
    handleFlagSelect,
    handleDragOver,
    handleDrop,
    handleClear,
    handleSave,
    stayOnPage,
    toggleStayOnPage,
    handlePrint,
  }
}

import type { CountryPayload } from '../types/country.types'

export type CountryFormField =
  | 'countryCode'
  | 'name'
  | 'nativeName'
  | 'iso2'
  | 'iso3'
  | 'isoNumeric'

/** Field -> i18n key of the message to render. */
export type CountryFormErrors = Partial<Record<CountryFormField, string>>

const ISO2_PATTERN = /^[A-Za-z]{2}$/
const ISO3_PATTERN = /^[A-Za-z]{3}$/
const ISONUMERIC_PATTERN = /^\d{3}$/

export function normalizeCountryPayload(values: CountryPayload): CountryPayload {
  return {
    ...values,
    countryCode: values.countryCode.trim().toUpperCase(),
    name: values.name.trim(),
    nativeName: values.nativeName.trim(),
    iso2: values.iso2.trim().toUpperCase(),
    iso3: values.iso3.trim().toUpperCase(),
    isoNumeric: values.isoNumeric.trim(),
  }
}

export function validateCountryForm(values: CountryPayload): CountryFormErrors {
  const normalized = normalizeCountryPayload(values)
  const errors: CountryFormErrors = {}

  if (normalized.countryCode.length === 0) {
    errors.countryCode = 'country.form.errors.countryCodeRequired'
  }

  if (normalized.name.length === 0) {
    errors.name = 'country.form.errors.nameRequired'
  }

  if (normalized.nativeName.length === 0) {
    errors.nativeName = 'country.form.errors.nativeNameRequired'
  }

  if (!ISO2_PATTERN.test(normalized.iso2)) {
    errors.iso2 = 'country.form.errors.iso2Length'
  }

  if (!ISO3_PATTERN.test(normalized.iso3)) {
    errors.iso3 = 'country.form.errors.iso3Length'
  }

  if (!ISONUMERIC_PATTERN.test(normalized.isoNumeric)) {
    errors.isoNumeric = 'country.form.errors.isoNumericFormat'
  }

  return errors
}

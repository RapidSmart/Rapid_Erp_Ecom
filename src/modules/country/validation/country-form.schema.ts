import type { CountryPayload } from '../types/country.types'

export type CountryFormField =
  | 'name'
  | 'iso2'
  | 'iso3'
  | 'currency'
  | 'callingCode'

/** Field -> i18n key of the message to render. */
export type CountryFormErrors = Partial<Record<CountryFormField, string>>

const ISO2_PATTERN = /^[A-Za-z]{2}$/
const ISO3_PATTERN = /^[A-Za-z]{3}$/
const CURRENCY_PATTERN = /^[A-Za-z]{3}$/
const CALLING_CODE_PATTERN = /^\+\d{1,4}$/

export function normalizeCountryPayload(values: CountryPayload): CountryPayload {
  return {
    name: values.name.trim(),
    iso2: values.iso2.trim().toUpperCase(),
    iso3: values.iso3.trim().toUpperCase(),
    currency: values.currency.trim().toUpperCase(),
    callingCode: values.callingCode.trim(),
    status: values.status,
  }
}

export function validateCountryForm(values: CountryPayload): CountryFormErrors {
  const normalized = normalizeCountryPayload(values)
  const errors: CountryFormErrors = {}

  if (normalized.name.length === 0) {
    errors.name = 'country.form.errors.nameRequired'
  }

  if (!ISO2_PATTERN.test(normalized.iso2)) {
    errors.iso2 = 'country.form.errors.iso2Length'
  }

  if (!ISO3_PATTERN.test(normalized.iso3)) {
    errors.iso3 = 'country.form.errors.iso3Length'
  }

  if (!CURRENCY_PATTERN.test(normalized.currency)) {
    errors.currency = 'country.form.errors.currencyLength'
  }

  if (!CALLING_CODE_PATTERN.test(normalized.callingCode)) {
    errors.callingCode = 'country.form.errors.callingCodeFormat'
  }

  return errors
}

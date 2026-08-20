import type { CountryFormValues, FlagGalleryItem, SelectOption, CountryTemplate } from '../types/country.types'

export const FLAG_GALLERY: readonly FlagGalleryItem[] = [
  {
    code: 'US',
    flagGradient:
      'linear-gradient(180deg, rgb(178,34,52) 0%, rgb(178,34,52) 8%, rgb(255,255,255) 8%, rgb(255,255,255) 16%)',
  },
  {
    code: 'FR',
    flagGradient:
      'linear-gradient(90deg, rgb(0,35,149) 0%, rgb(0,35,149) 33.33%, rgb(255,255,255) 33.33%, rgb(255,255,255) 66.66%, rgb(237,41,57) 66.66%, rgb(237,41,57) 100%)',
  },
  {
    code: 'DE',
    flagGradient:
      'linear-gradient(180deg, rgb(0,0,0) 0%, rgb(0,0,0) 33.33%, rgb(221,0,0) 33.33%, rgb(221,0,0) 66.66%, rgb(255,206,0) 66.66%, rgb(255,206,0) 100%)',
  },
  {
    code: 'IN',
    flagGradient:
      'linear-gradient(180deg, rgb(255,153,51) 0%, rgb(255,153,51) 33.33%, rgb(255,255,255) 33.33%, rgb(255,255,255) 66.66%, rgb(19,136,8) 66.66%, rgb(19,136,8) 100%)',
  },
  {
    code: 'AE',
    flagGradient:
      'linear-gradient(180deg, rgb(0,115,47) 0%, rgb(0,115,47) 33%, rgb(255,255,255) 33%, rgb(255,255,255) 66%, rgb(0,0,0) 66%)',
  },
  {
    code: 'JP',
    flagGradient:
      'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 24 16\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%25\' width=\'100%25\' fill=\'url(%23grad)\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(1.4224 0 0 1.4901 12 8)\'><stop stop-color=\'rgba(188,0,45,1)\' offset=\'0\'/><stop stop-color=\'rgba(188,0,45,1)\' offset=\'0.26\'/><stop stop-color=\'rgba(255,255,255,1)\' offset=\'0.26\'/></radialGradient></defs></svg>")',
  },
  {
    code: 'CA',
    flagGradient:
      'linear-gradient(90deg, rgb(216,6,33) 0%, rgb(216,6,33) 33.33%, rgb(255,255,255) 33.33%, rgb(255,255,255) 66.66%, rgb(216,6,33) 66.66%, rgb(216,6,33) 100%)',
  },
  {
    code: 'GB',
    flagGradient:
      'linear-gradient(46.33deg, rgb(0,36,125) 0%, rgb(0,36,125) 42%, rgb(207,20,43) 42%, rgb(207,20,43) 58%, rgb(0,36,125) 58%)',
  },
  {
    code: 'AU',
    flagGradient:
      'linear-gradient(133.67deg, rgb(0,36,125) 0%, rgb(0,36,125) 60%, rgb(255,255,255) 60%)',
  },
  {
    code: 'BR',
    flagGradient:
      'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 24 16\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%25\' width=\'100%25\' fill=\'url(%23grad)\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(1.4224 0 0 1.4901 12 8)\'><stop stop-color=\'rgba(255,223,0,1)\' offset=\'0\'/><stop stop-color=\'rgba(255,223,0,1)\' offset=\'0.34\'/><stop stop-color=\'rgba(0,156,59,1)\' offset=\'0.34\'/></radialGradient></defs></svg>")',
  },
  {
    code: 'ZA',
    flagGradient:
      'linear-gradient(180deg, rgb(0,122,77) 0%, rgb(0,122,77) 33.33%, rgb(255,182,18) 33.33%, rgb(255,182,18) 66.66%, rgb(222,56,49) 66.66%, rgb(222,56,49) 100%)',
  },
  {
    code: 'SG',
    flagGradient:
      'linear-gradient(180deg, rgb(239,51,64) 0%, rgb(239,51,64) 50%, rgb(255,255,255) 50%)',
  },
] as const

export const CONTINENT_OPTIONS: readonly SelectOption[] = [
  { value: 'africa', label: 'Africa' },
  { value: 'antarctica', label: 'Antarctica' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'north_america', label: 'North America' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'south_america', label: 'South America' },
] as const

export const CURRENCY_OPTIONS: readonly SelectOption[] = [
  { value: 'aed', label: 'AED - UAE Dirham' },
  { value: 'aud', label: 'AUD - Australian Dollar' },
  { value: 'brl', label: 'BRL - Brazilian Real' },
  { value: 'cad', label: 'CAD - Canadian Dollar' },
  { value: 'eur', label: 'EUR - Euro' },
  { value: 'gbp', label: 'GBP - British Pound' },
  { value: 'inr', label: 'INR - Indian Rupee' },
  { value: 'jpy', label: 'JPY - Japanese Yen' },
  { value: 'usd', label: 'USD - US Dollar' },
] as const

export const STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const

export const DEFAULT_COUNTRY_OPTIONS: readonly SelectOption[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
] as const

export const REQUIRED_FIELDS: readonly (keyof CountryFormValues)[] = [
  'isoCode',
  'countryName',
  'diallingCode',
  'continent',
  'currency',
] as const

export const MOCK_EDIT_COUNTRY: CountryFormValues = {
  isoCode: 'US',
  countryName: 'United States',
  diallingCode: '+1',
  continent: 'north_america',
  currency: 'usd',
  status: 'active',
  defaultCountry: 'yes',
  flagFile: null,
  selectedFlag: 'US',
  internalNote: 'Primary operation market in North America.',
}

export const COUNTRY_TEMPLATES: readonly CountryTemplate[] = [
  {
    code: 'US',
    name: 'United States',
    continent: 'north_america',
    continentLabel: 'North America',
    diallingCode: '+1',
    currency: 'usd',
    selectedFlag: 'US',
  },
  {
    code: 'CA',
    name: 'Canada',
    continent: 'north_america',
    continentLabel: 'North America',
    diallingCode: '+1',
    currency: 'cad',
    selectedFlag: 'CA',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    continent: 'europe',
    continentLabel: 'Europe',
    diallingCode: '+44',
    currency: 'gbp',
    selectedFlag: 'GB',
  },
  {
    code: 'AU',
    name: 'Australia',
    continent: 'oceania',
    continentLabel: 'Oceania',
    diallingCode: '+61',
    currency: 'aud',
    selectedFlag: 'AU',
  },
  {
    code: 'DE',
    name: 'Germany',
    continent: 'europe',
    continentLabel: 'Europe',
    diallingCode: '+49',
    currency: 'eur',
    selectedFlag: 'DE',
  },
  {
    code: 'FR',
    name: 'France',
    continent: 'europe',
    continentLabel: 'Europe',
    diallingCode: '+33',
    currency: 'eur',
    selectedFlag: 'FR',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    continent: 'asia',
    continentLabel: 'Asia',
    diallingCode: '+971',
    currency: 'aed',
    selectedFlag: 'AE',
  },
  {
    code: 'IN',
    name: 'India',
    continent: 'asia',
    continentLabel: 'Asia',
    diallingCode: '+91',
    currency: 'inr',
    selectedFlag: 'IN',
  },
  {
    code: 'JP',
    name: 'Japan',
    continent: 'asia',
    continentLabel: 'Asia',
    diallingCode: '+81',
    currency: 'jpy',
    selectedFlag: 'JP',
  },
  {
    code: 'BR',
    name: 'Brazil',
    continent: 'south_america',
    continentLabel: 'South America',
    diallingCode: '+55',
    currency: 'brl',
    selectedFlag: 'BR',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    continent: 'africa',
    continentLabel: 'Africa',
    diallingCode: '+27',
    currency: '',
    selectedFlag: 'ZA',
  },
  {
    code: 'SG',
    name: 'Singapore',
    continent: 'asia',
    continentLabel: 'Asia',
    diallingCode: '+65',
    currency: '',
    selectedFlag: 'SG',
  },
] as const


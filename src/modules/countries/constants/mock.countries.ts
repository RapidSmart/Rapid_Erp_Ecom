import type { CountryFormValues, FlagGalleryItem, SelectOption } from '../types/country.types'

export const SVG_PATHS = {
  calendarRect:
    'M15.2375 0.6375H3.0375C1.71202 0.6375 0.6375 1.71202 0.6375 3.0375V13.2375C0.6375 14.563 1.71202 15.6375 3.0375 15.6375H15.2375C16.563 15.6375 17.6375 14.563 17.6375 13.2375V3.0375C17.6375 1.71202 16.563 0.6375 15.2375 0.6375Z',
  calendarLines: 'M0.6375 0.6375H17.6375M6.6375 0.6375V10.6375',
  translate:
    'M0.673072 0.672917H9.67307M5.17307 0.672917V2.17292C5.17307 5.77292 3.17307 8.17292 0.673072 9.37292M2.67307 5.17292C4.07307 7.77292 6.07307 9.17292 8.17307 9.77292M9.67307 14.6729L13.6731 4.67292L17.6731 14.6729M11.2731 11.3729H16.0731',
  uploadArrow: 'M12 16V4M16.5 8.5L12 4L7.5 8.5',
  uploadTray:
    'M4 15V18.5C4 18.8978 4.15804 19.2794 4.43934 19.5607C4.72064 19.842 5.10218 20 5.5 20H18.5C18.8978 20 19.2794 19.842 19.5607 19.5607C19.842 19.2794 20 18.8978 20 18.5V15',
  duplicate: 'M3.125 9.375V3.125H9.375M5.625 5.625H11.875V11.875H5.625V5.625Z',
  print:
    'M4.375 5.625V2.5H10.625V5.625M4.375 10.625H3.125V6.875H11.875V10.625H10.625M4.375 8.75H10.625V12.5H4.375V8.75Z',
} as const

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

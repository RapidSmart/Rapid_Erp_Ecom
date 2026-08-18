import countriesEn from '@/modules/countries/i18n/en.json'

type Translations = Record<string, unknown>

const resources: Record<string, Translations> = {
  en: {
    ...countriesEn,
  },
}

export function useTranslation(locale = 'en') {
  const dict = resources[locale] ?? resources.en ?? {}

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let current: unknown = dict

    for (const k of keys) {
      if (typeof current === 'object' && current !== null && k in current) {
        current = (current as Record<string, unknown>)[k]
      } else {
        return key
      }
    }

    if (typeof current !== 'string') {
      return key
    }

    if (!params) return current

    return Object.entries(params).reduce(
      (acc, [paramKey, paramVal]) =>
        acc.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramVal)),
      current,
    )
  }

  return { t }
}

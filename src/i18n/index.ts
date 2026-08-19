import countryEn from '@/modules/country/i18n/en.json'
import productEn from '@/modules/product/i18n/en.json'
import categoryEn from '@/modules/category/i18n/en.json'
import industriesEn from '@/modules/industries/i18n/en.json'

/**
 * Loader/merger only — this folder never holds UI copy. Every module ships its
 * own `modules/<name>/i18n/{locale}.json` and registers it here, namespaced by
 * module name (`country.listing.title`).
 */
export type Locale = 'en'

export type TranslationTree = { [key: string]: string | TranslationTree }

export type TranslationVars = Record<string, string | number>

const resources: Record<Locale, TranslationTree> = {
  en: {
    country: countryEn as unknown as TranslationTree,
    product: productEn as unknown as TranslationTree,
    category: categoryEn as unknown as TranslationTree,
    industries: industriesEn as unknown as TranslationTree,
  },
}

const DEFAULT_LOCALE: Locale = 'en'

function resolve(tree: TranslationTree, key: string): string | undefined {
  const value = key
    .split('.')
    .reduce<string | TranslationTree | undefined>(
      (node, part) =>
        typeof node === 'object' && node !== null ? node[part] : undefined,
      tree
    )

  return typeof value === 'string' ? value : undefined
}

function interpolate(template: string, vars: TranslationVars): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, name: string) => {
    const value = vars[name]

    return value === undefined ? match : String(value)
  })
}

export function translate(
  key: string,
  vars?: TranslationVars,
  locale: Locale = DEFAULT_LOCALE
): string {
  const template = resolve(resources[locale], key)

  if (template === undefined) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation for "${key}" (${locale})`)
    }

    // Missing-key fallback: render the key so the gap is visible, never blank.
    return key
  }

  return vars ? interpolate(template, vars) : template
}

const translation = { t: translate }

export function useTranslation() {
  return translation
}

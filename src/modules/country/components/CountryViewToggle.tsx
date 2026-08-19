import { LayoutGrid, List } from 'lucide-react'
import { useTranslation } from '@/i18n'
import type { CountryView } from '../types/country.types'

export interface CountryViewToggleProps {
  view: CountryView
  onToggle: () => void
}

/** Shows the view you'll switch TO — "Grid" while in list mode, "List" while in grid mode. */
function CountryViewToggle({ view, onToggle }: CountryViewToggleProps) {
  const { t } = useTranslation()
  const target: CountryView = view === 'list' ? 'grid' : 'list'
  const TargetIcon = target === 'grid' ? LayoutGrid : List

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={t('country.listing.viewToggle', {
        view: t(`country.listing.view.${target}`),
      })}
      className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-surface-border bg-surface px-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <TargetIcon className="size-3.5" aria-hidden="true" />
      {t(`country.listing.view.${target}`)}
    </button>
  )
}

export { CountryViewToggle }

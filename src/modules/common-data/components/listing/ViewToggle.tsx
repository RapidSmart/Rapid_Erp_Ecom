import { LayoutGrid, List } from 'lucide-react'
import { useTranslation } from '@/i18n'
import type { ViewToggleProps, ListingView } from '../../types/common-data.types'

export function ViewToggle({ view, onToggle, ariaLabel }: ViewToggleProps) {
  const { t } = useTranslation()
  const target: ListingView = view === 'list' ? 'grid' : 'list'
  const TargetIcon = target === 'grid' ? LayoutGrid : List

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        ariaLabel ??
        t('common.listing.viewToggle', {
          view: t(`common.listing.view.${target}`),
        })
      }
      className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-surface-border bg-surface px-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <TargetIcon className="size-3.5" aria-hidden="true" />
      {t(`common.listing.view.${target}`)}
    </button>
  )
}

import { LayoutGrid, List } from 'lucide-react'
import { useTranslation } from '@/i18n'
import type { RakView } from '../types/rak.types'

export interface RakViewToggleProps {
  view: RakView
  onToggle: () => void
}

function RakViewToggle({ view, onToggle }: RakViewToggleProps) {
  const { t } = useTranslation()
  const target: RakView = view === 'list' ? 'grid' : 'list'
  const TargetIcon = target === 'grid' ? LayoutGrid : List

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={t('rak.listing.viewToggle', {
        view: t(`rak.listing.view.${target}`),
      })}
      className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-surface-border bg-surface px-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <TargetIcon className="size-3.5" aria-hidden="true" />
      {t(`rak.listing.view.${target}`)}
    </button>
  )
}

export { RakViewToggle }

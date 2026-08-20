import { LayoutGrid, List } from 'lucide-react'
import { useTranslation } from '@/i18n'
import type { DepartmentView } from '../types/department.types'

export interface DepartmentViewToggleProps {
  view: DepartmentView
  onToggle: () => void
}

function DepartmentViewToggle({ view, onToggle }: DepartmentViewToggleProps) {
  const { t } = useTranslation()
  const target: DepartmentView = view === 'list' ? 'grid' : 'list'
  const TargetIcon = target === 'grid' ? LayoutGrid : List

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={t('department.listing.viewToggle', {
        view: t(`department.listing.view.${target}`),
      })}
      className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-surface-border bg-surface px-3 text-xs font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <TargetIcon className="size-3.5" aria-hidden="true" />
      {t(`department.listing.view.${target}`)}
    </button>
  )
}

export { DepartmentViewToggle }

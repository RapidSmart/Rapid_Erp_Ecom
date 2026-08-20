import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { RangeSwitch, StatDonut, STAT_TILES } from '@/modules/common-data'
import type { CategoryOverviewPanelProps } from '../types/category.types'

function CategoryOverviewPanel({
  state,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: CategoryOverviewPanelProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t('category.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-ink-subtle">
          {t('category.overview.title')}
        </h2>

        <RangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('category.states.errorAction')}
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {STAT_TILES.map((tile) => {
            if (state.status === 'loading') {
              return (
                <div
                  key={tile.tone}
                  className="size-29.5 shrink-0 animate-pulse rounded-full border-13 border-stat-track"
                  aria-hidden="true"
                />
              )
            }

            const stat = state.data[tile.tone]
            const label = t(tile.labelKey)
            const tileStatus = tile.status

            return (
              <StatDonut
                key={tile.tone}
                tone={tile.tone}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === tileStatus}
                actionLabel={
                  tileStatus === null
                    ? t('category.overview.clearFilterHint')
                    : t('category.overview.statFilterHint', { status: label })
                }
                onSelect={() =>
                  onStatusFilterChange(
                    statusFilter === tileStatus ? null : tileStatus
                  )
                }
              />
            )
          })}
        </div>
      )}

      {state.status === 'loading' && (
        <span className="sr-only" role="status">
          {t('category.states.loading')}
        </span>
      )}
    </section>
  )
}

export { CategoryOverviewPanel }

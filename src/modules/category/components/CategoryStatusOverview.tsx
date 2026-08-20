import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { OverviewCard, RangeSwitch, STAT_TILES } from '@/modules/common-data'
import type { CategoryStatus, CategoryStatusOverviewProps } from '../types/category.types'

function CategoryStatusOverview({
  state,
  recordCount,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: CategoryStatusOverviewProps) {
  const { t } = useTranslation()
  const tiles = STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('category.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('category.overview.title')}
          </h2>
          <span className="text-xs text-ink-subtle">
            {t('category.overview.records', { count: recordCount })}
          </span>
        </div>

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
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => {
            if (state.status === 'loading') {
              return (
                <div
                  key={tile.tone}
                  className="h-22 animate-pulse rounded-2xl bg-surface-muted"
                  aria-hidden="true"
                />
              )
            }

            const stat = state.data[tile.tone]
            const label =
              tile.tone === 'delete'
                ? t('category.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as CategoryStatus

            return (
              <OverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === status}
                actionLabel={
                  statusFilter === status
                    ? t('category.overview.clearFilterHint')
                    : t('category.overview.statFilterHint', { status: label })
                }
                onSelect={() =>
                  onStatusFilterChange(statusFilter === status ? null : status)
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

export { CategoryStatusOverview }

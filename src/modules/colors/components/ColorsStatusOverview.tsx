import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { ColorsOverviewCard } from './ColorsOverviewCard'
import { ColorsRangeSwitch } from './ColorsRangeSwitch'
import { COLORS_STAT_TILES } from '../constants/colors-overview.data'
import type {
  AsyncState,
  ColorOverview,
  ColorStatus,
  ColorTimeRange,
} from '../types/colors.types'

export interface ColorsStatusOverviewProps {
  state: AsyncState<ColorOverview>
  recordCount: number
  range: ColorTimeRange
  onRangeChange: (range: ColorTimeRange) => void
  statusFilter: ColorStatus | null
  onStatusFilterChange: (status: ColorStatus | null) => void
  onRetry: () => void
}

/** List view's overview panel: pastel status cards instead of the grid view's plain donuts. */
function ColorsStatusOverview({
  state,
  recordCount,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: ColorsStatusOverviewProps) {
  const { t } = useTranslation()
  const tiles = COLORS_STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('colors.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('colors.overview.title')}
          </h2>
          <span className="text-xs text-ink-subtle">
            {t('colors.overview.records', { count: recordCount })}
          </span>
        </div>

        <ColorsRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('colors.states.errorAction')}
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
            // The list view calls the "delete" status card "Deleted" — a
            // completed-state label, distinct from the "Delete" action/badge
            // wording used elsewhere, so it gets its own key rather than
            // reusing tile.labelKey.
            const label =
              tile.tone === 'delete'
                ? t('colors.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as ColorStatus

            return (
              <ColorsOverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === status}
                actionLabel={
                  statusFilter === status
                    ? t('colors.overview.clearFilterHint')
                    : t('colors.overview.statFilterHint', { status: label })
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
          {t('colors.states.loading')}
        </span>
      )}
    </section>
  )
}

export { ColorsStatusOverview }

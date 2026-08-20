import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { RakOverviewCard } from './RakOverviewCard'
import { RakRangeSwitch } from './RakRangeSwitch'
import { RAK_STAT_TILES } from '../constants/rak-overview.data'
import type {
  AsyncState,
  RakOverview,
  RakStatus,
  RakTimeRange,
} from '../types/rak.types'

export interface RakStatusOverviewProps {
  state: AsyncState<RakOverview>
  recordCount: number
  range: RakTimeRange
  onRangeChange: (range: RakTimeRange) => void
  statusFilter: RakStatus | null
  onStatusFilterChange: (status: RakStatus | null) => void
  onRetry: () => void
}

/** List view's overview panel: pastel status cards instead of the grid view's plain donuts. */
function RakStatusOverview({
  state,
  recordCount,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: RakStatusOverviewProps) {
  const { t } = useTranslation()
  const tiles = RAK_STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('rak.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('rak.overview.title')}
          </h2>
          <span className="text-xs text-ink-subtle">
            {t('rak.overview.records', { count: recordCount })}
          </span>
        </div>

        <RakRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('rak.states.errorAction')}
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
                ? t('rak.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as RakStatus

            return (
              <RakOverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === status}
                actionLabel={
                  statusFilter === status
                    ? t('rak.overview.clearFilterHint')
                    : t('rak.overview.statFilterHint', { status: label })
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
          {t('rak.states.loading')}
        </span>
      )}
    </section>
  )
}

export { RakStatusOverview }

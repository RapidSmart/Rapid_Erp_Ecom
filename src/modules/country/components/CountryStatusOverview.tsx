import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { CountryOverviewCard } from './CountryOverviewCard'
import { CountryRangeSwitch } from './CountryRangeSwitch'
import { COUNTRY_STAT_TILES } from '../constants/country-overview.data'
import type {
  AsyncState,
  CountryOverview,
  CountryStatus,
  CountryTimeRange,
} from '../types/country.types'

export interface CountryStatusOverviewProps {
  state: AsyncState<CountryOverview>
  recordCount: number
  range: CountryTimeRange
  onRangeChange: (range: CountryTimeRange) => void
  statusFilter: CountryStatus | null
  onStatusFilterChange: (status: CountryStatus | null) => void
  onRetry: () => void
}

/** List view's overview panel: pastel status cards instead of the grid view's plain donuts. */
function CountryStatusOverview({
  state,
  recordCount,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: CountryStatusOverviewProps) {
  const { t } = useTranslation()
  const tiles = COUNTRY_STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('country.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('country.overview.title')}
          </h2>
          <span className="text-xs text-ink-subtle">
            {t('country.overview.records', { count: recordCount })}
          </span>
        </div>

        <CountryRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('country.states.errorAction')}
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
                ? t('country.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as CountryStatus

            return (
              <CountryOverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === status}
                actionLabel={
                  statusFilter === status
                    ? t('country.overview.clearFilterHint')
                    : t('country.overview.statFilterHint', { status: label })
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
          {t('country.states.loading')}
        </span>
      )}
    </section>
  )
}

export { CountryStatusOverview }

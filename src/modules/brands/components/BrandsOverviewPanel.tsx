import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { IndustriesRangeSwitch } from './IndustriesRangeSwitch'
import { IndustryStatDonut } from './IndustryStatDonut'
import { INDUSTRIES_STAT_TILES } from '../constants/industries-overview.data'
import type {
  AsyncState,
  IndustryOverview,
  IndustryStatus,
  IndustryTimeRange,
} from '../types/industries.types'

export interface IndustriesOverviewPanelProps {
  state: AsyncState<IndustryOverview>
  range: IndustryTimeRange
  onRangeChange: (range: IndustryTimeRange) => void
  statusFilter: IndustryStatus | null
  onStatusFilterChange: (status: IndustryStatus | null) => void
  onRetry: () => void
}

function IndustriesOverviewPanel({
  state,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: IndustriesOverviewPanelProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t('industries.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-ink-subtle">
          {t('industries.overview.title')}
        </h2>

        <IndustriesRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('industries.states.errorAction')}
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES_STAT_TILES.map((tile) => {
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
              <IndustryStatDonut
                key={tile.tone}
                tone={tile.tone}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === tileStatus}
                actionLabel={
                  tileStatus === null
                    ? t('industries.overview.clearFilterHint')
                    : t('industries.overview.statFilterHint', { status: label })
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
          {t('industries.states.loading')}
        </span>
      )}
    </section>
  )
}

export { IndustriesOverviewPanel }

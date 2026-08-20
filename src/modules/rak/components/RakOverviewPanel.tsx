import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { RakRangeSwitch } from './RakRangeSwitch'
import { RakStatDonut } from './RakStatDonut'
import { RAK_STAT_TILES } from '../constants/rak-overview.data'
import type {
  AsyncState,
  RakOverview,
  RakStatus,
  RakTimeRange,
} from '../types/rak.types'

export interface RakOverviewPanelProps {
  state: AsyncState<RakOverview>
  range: RakTimeRange
  onRangeChange: (range: RakTimeRange) => void
  statusFilter: RakStatus | null
  onStatusFilterChange: (status: RakStatus | null) => void
  onRetry: () => void
}

function RakOverviewPanel({
  state,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: RakOverviewPanelProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t('rak.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-ink-subtle">
          {t('rak.overview.title')}
        </h2>

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
        <div className="mt-4 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {RAK_STAT_TILES.map((tile) => {
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
              <RakStatDonut
                key={tile.tone}
                tone={tile.tone}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === tileStatus}
                actionLabel={
                  tileStatus === null
                    ? t('rak.overview.clearFilterHint')
                    : t('rak.overview.statFilterHint', { status: label })
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
          {t('rak.states.loading')}
        </span>
      )}
    </section>
  )
}

export { RakOverviewPanel }

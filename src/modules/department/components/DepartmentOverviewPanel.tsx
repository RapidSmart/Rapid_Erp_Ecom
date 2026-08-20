import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { RangeSwitch, StatDonut, STAT_TILES } from '@/modules/common-data'
import type { DepartmentOverviewPanelProps } from '../types/department.types'

export function DepartmentOverviewPanel({
  overviewState,
  range,
  onRangeChange,
  activeStatus,
  onStatusChange,
  onRetry,
}: DepartmentOverviewPanelProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t('department.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-ink-subtle">
          {t('department.overview.title')}
        </h2>

        <RangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {overviewState.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{overviewState.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('department.states.errorAction')}
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {STAT_TILES.map((tile) => {
            if (overviewState.status === 'loading') {
              return (
                <div
                  key={tile.tone}
                  className="size-29.5 shrink-0 animate-pulse rounded-full border-13 border-stat-track"
                  aria-hidden="true"
                />
              )
            }

            const stat = overviewState.data[tile.tone]
            const label = t(tile.labelKey)
            const tileStatus = tile.status

            return (
              <StatDonut
                key={tile.tone}
                tone={tile.tone}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={activeStatus === tileStatus}
                actionLabel={
                  tileStatus === null
                    ? t('department.overview.clearFilterHint')
                    : t('department.overview.statFilterHint', { status: label })
                }
                onSelect={() =>
                  onStatusChange(
                    activeStatus === tileStatus ? null : tileStatus
                  )
                }
              />
            )
          })}
        </div>
      )}

      {overviewState.status === 'loading' && (
        <span className="sr-only" role="status">
          {t('department.states.loading')}
        </span>
      )}
    </section>
  )
}

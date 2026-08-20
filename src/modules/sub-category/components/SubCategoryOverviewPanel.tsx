import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { SubCategoryRangeSwitch } from './SubCategoryRangeSwitch'
import { SubCategoryStatDonut } from './SubCategoryStatDonut'
import { SUB_CATEGORY_STAT_TILES } from '../constants/sub-category-overview.data'
import type { SubCategoryOverviewPanelProps } from '../types/sub-category.types'

export function SubCategoryOverviewPanel({
  overviewState,
  range,
  onRangeChange,
  activeStatus,
  onStatusChange,
  onRetry,
}: SubCategoryOverviewPanelProps) {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t('subCategory.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-ink-subtle">
          {t('subCategory.overview.title')}
        </h2>

        <SubCategoryRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {overviewState.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{overviewState.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('subCategory.states.errorAction')}
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {SUB_CATEGORY_STAT_TILES.map((tile) => {
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
              <SubCategoryStatDonut
                key={tile.tone}
                tone={tile.tone}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={activeStatus === tileStatus}
                actionLabel={
                  tileStatus === null
                    ? t('subCategory.overview.clearFilterHint')
                    : t('subCategory.overview.statFilterHint', { status: label })
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
          {t('subCategory.states.loading')}
        </span>
      )}
    </section>
  )
}

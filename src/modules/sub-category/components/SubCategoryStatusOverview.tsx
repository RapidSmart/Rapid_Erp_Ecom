import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { SubCategoryOverviewCard } from './SubCategoryOverviewCard'
import { SubCategoryRangeSwitch } from './SubCategoryRangeSwitch'
import { SUB_CATEGORY_STAT_TILES } from '../constants/sub-category-overview.data'
import type { SubCategoryStatus, SubCategoryStatusOverviewProps } from '../types/sub-category.types'

export function SubCategoryStatusOverview({
  overviewState,
  range,
  onRangeChange,
  activeStatus,
  onStatusChange,
  onRetry,
}: SubCategoryStatusOverviewProps & { recordCount?: number }) {
  const { t } = useTranslation()
  const tiles = SUB_CATEGORY_STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('subCategory.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('subCategory.overview.title')}
          </h2>
        </div>

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
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => {
            if (overviewState.status === 'loading') {
              return (
                <div
                  key={tile.tone}
                  className="h-22 animate-pulse rounded-2xl bg-surface-muted"
                  aria-hidden="true"
                />
              )
            }

            const stat = overviewState.data[tile.tone]
            const label =
              tile.tone === 'delete'
                ? t('subCategory.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as SubCategoryStatus

            return (
              <SubCategoryOverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={activeStatus === status}
                actionLabel={
                  activeStatus === status
                    ? t('subCategory.overview.clearFilterHint')
                    : t('subCategory.overview.statFilterHint', { status: label })
                }
                onSelect={() =>
                  onStatusChange(activeStatus === status ? null : status)
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

import { TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { Button } from '@/shared/components/ui/button'
import { ProductOverviewCard } from './ProductOverviewCard'
import { ProductRangeSwitch } from './ProductRangeSwitch'
import { PRODUCT_STAT_TILES } from '../constants/product-overview.data'
import type {
  AsyncState,
  ProductOverview,
  ProductStatus,
  ProductTimeRange,
} from '../types/product.types'

export interface ProductStatusOverviewProps {
  state: AsyncState<ProductOverview>
  recordCount: number
  range: ProductTimeRange
  onRangeChange: (range: ProductTimeRange) => void
  statusFilter: ProductStatus | null
  onStatusFilterChange: (status: ProductStatus | null) => void
  onRetry: () => void
}

function ProductStatusOverview({
  state,
  recordCount,
  range,
  onRangeChange,
  statusFilter,
  onStatusFilterChange,
  onRetry,
}: ProductStatusOverviewProps) {
  const { t } = useTranslation()
  const tiles = PRODUCT_STAT_TILES.filter((tile) => tile.status !== null)

  return (
    <section
      aria-label={t('product.overview.title')}
      className="rounded-xl border border-surface-border bg-surface px-5 py-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold text-ink">
            {t('product.overview.title')}
          </h2>
          <span className="text-xs text-ink-subtle">
            {t('product.overview.records', { count: recordCount })}
          </span>
        </div>

        <ProductRangeSwitch range={range} onRangeChange={onRangeChange} />
      </div>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <TriangleAlert
            className="size-6 text-status-delete-ink"
            aria-hidden="true"
          />
          <p className="text-xs text-ink-muted">{state.error.message}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('product.states.errorAction')}
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
                ? t('product.overview.stats.deleted')
                : t(tile.labelKey)
            const status = tile.status as ProductStatus

            return (
              <ProductOverviewCard
                key={tile.tone}
                status={status}
                label={label}
                value={stat.value}
                percentage={stat.percentage}
                selected={statusFilter === status}
                actionLabel={
                  statusFilter === status
                    ? t('product.overview.clearFilterHint')
                    : t('product.overview.statFilterHint', { status: label })
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
          {t('product.states.loading')}
        </span>
      )}
    </section>
  )
}

export { ProductStatusOverview }

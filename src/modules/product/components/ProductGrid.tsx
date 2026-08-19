import { Package, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './skeleton/ProductCardSkeleton'
import { ProductFeedback } from './ProductFeedback'
import type { ProductGridProps } from '../types/product.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'


function ProductGrid({
  state,
  isRefreshing,
  isFiltered,
  onRetry,
  onClearFilters,
  onAdd,
  onOpenDetails,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return (
      <div className={gridClasses} role="status" aria-busy="true">
        <span className="sr-only">{t('product.states.loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <ProductFeedback
        icon={TriangleAlert}
        tone="danger"
        title={t('product.states.errorTitle')}
        body={state.error.message}
        actionLabel={t('product.states.errorAction')}
        onAction={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return isFiltered ? (
      <ProductFeedback
        icon={SearchX}
        title={t('product.states.noResultsTitle')}
        body={t('product.states.noResultsBody')}
        actionLabel={t('product.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <ProductFeedback
        icon={Package}
        title={t('product.states.emptyTitle')}
        body={t('product.states.emptyBody')}
        actionLabel={t('product.states.emptyAction')}
        onAction={onAdd}
      />
    )
  }

  return (
    <ul
      aria-label={t('product.listing.grid')}
      aria-busy={isRefreshing}
      className={cn(
        gridClasses,
        'list-none transition-opacity',
        isRefreshing && 'opacity-60'
      )}
    >
      {state.data.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard
            product={product}
            onOpenDetails={onOpenDetails}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}

export { ProductGrid }

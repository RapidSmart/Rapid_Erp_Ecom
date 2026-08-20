import { Folder, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { Feedback, CardSkeleton } from '@/modules/common-data'
import { CategoryCard } from './CategoryCard'
import type { CategoryGridProps } from '../types/category.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'

function CategoryGrid({
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
}: CategoryGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return (
      <div className={gridClasses} role="status" aria-busy="true">
        <span className="sr-only">{t('category.states.loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <Feedback
        icon={TriangleAlert}
        tone="danger"
        title={t('category.states.errorTitle')}
        body={state.error.message}
        actionLabel={t('category.states.errorAction')}
        onAction={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return isFiltered ? (
      <Feedback
        icon={SearchX}
        title={t('category.states.noResultsTitle')}
        body={t('category.states.noResultsBody')}
        actionLabel={t('category.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <Feedback
        icon={Folder}
        title={t('category.states.emptyTitle')}
        body={t('category.states.emptyBody')}
        actionLabel={t('category.states.emptyAction')}
        onAction={onAdd}
      />
    )
  }

  return (
    <ul
      aria-label={t('category.listing.grid')}
      aria-busy={isRefreshing}
      className={cn(
        gridClasses,
        'list-none transition-opacity',
        isRefreshing && 'opacity-60'
      )}
    >
      {state.data.map((category) => (
        <li key={category.code} className="flex">
          <CategoryCard
            category={category}
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

export { CategoryGrid }

import { Folder, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { CategoryCard } from './CategoryCard'
import { CategoryCardSkeleton } from './CategoryCardSkeleton'
import { CategoryFeedback } from './CategoryFeedback'
import type { AsyncState, Category } from '../types/category.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'

export interface CategoryGridProps {
  state: AsyncState<Category[]>
  isRefreshing: boolean
  isFiltered: boolean
  onRetry: () => void
  onClearFilters: () => void
  onAdd: () => void
  onOpenDetails: (category: Category) => void
  onEdit: (category: Category) => void
  onDuplicate: (category: Category) => void
  onDelete: (category: Category) => void
}

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
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <CategoryFeedback
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
      <CategoryFeedback
        icon={SearchX}
        title={t('category.states.noResultsTitle')}
        body={t('category.states.noResultsBody')}
        actionLabel={t('category.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <CategoryFeedback
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

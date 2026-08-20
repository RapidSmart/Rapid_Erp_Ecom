import { FolderTree, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { SubCategoryCard } from './SubCategoryCard'
import { SubCategoryCardSkeleton } from './skeleton/SubCategoryCardSkeleton'
import { SubCategoryFeedback } from './SubCategoryFeedback'
import type { SubCategoryGridProps } from '../types/sub-category.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'

function SubCategoryGrid({
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
}: SubCategoryGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return (
      <div className={gridClasses} role="status" aria-busy="true">
        <span className="sr-only">{t('subCategory.states.loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <SubCategoryCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <SubCategoryFeedback
        actionIcon={TriangleAlert}
        variant="error"
        title={t('subCategory.states.errorTitle')}
        body={state.error.message}
        actionLabel={t('subCategory.states.errorAction')}
        onAction={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return isFiltered ? (
      <SubCategoryFeedback
        actionIcon={SearchX}
        variant="no-results"
        title={t('subCategory.states.noResultsTitle')}
        body={t('subCategory.states.noResultsBody')}
        actionLabel={t('subCategory.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <SubCategoryFeedback
        actionIcon={FolderTree}
        variant="empty"
        title={t('subCategory.states.emptyTitle')}
        body={t('subCategory.states.emptyBody')}
        actionLabel={t('subCategory.states.emptyAction')}
        onAction={onAdd}
      />
    )
  }

  return (
    <ul
      aria-label={t('subCategory.listing.grid')}
      aria-busy={isRefreshing}
      className={cn(
        gridClasses,
        'list-none transition-opacity',
        isRefreshing && 'opacity-60'
      )}
    >
      {state.data.map((subCategory) => (
        <li key={subCategory.code} className="flex">
          <SubCategoryCard
            subCategory={subCategory}
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

export { SubCategoryGrid }

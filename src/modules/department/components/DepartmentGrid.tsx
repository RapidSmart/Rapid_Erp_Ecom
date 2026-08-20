import { Building2, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { DepartmentCard } from './DepartmentCard'
import { DepartmentCardSkeleton } from './skeleton/DepartmentCardSkeleton'
import { DepartmentFeedback } from './DepartmentFeedback'
import type { DepartmentGridProps } from '../types/department.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'

function DepartmentGrid({
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
}: DepartmentGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return (
      <div className={gridClasses} role="status" aria-busy="true">
        <span className="sr-only">{t('department.states.loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <DepartmentCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <DepartmentFeedback
        actionIcon={TriangleAlert}
        variant="error"
        title={t('department.states.errorTitle')}
        body={state.error.message}
        actionLabel={t('department.states.errorAction')}
        onAction={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return isFiltered ? (
      <DepartmentFeedback
        actionIcon={SearchX}
        variant="no-results"
        title={t('department.states.noResultsTitle')}
        body={t('department.states.noResultsBody')}
        actionLabel={t('department.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <DepartmentFeedback
        actionIcon={Building2}
        variant="empty"
        title={t('department.states.emptyTitle')}
        body={t('department.states.emptyBody')}
        actionLabel={t('department.states.emptyAction')}
        onAction={onAdd}
      />
    )
  }

  return (
    <ul
      aria-label={t('department.listing.grid')}
      aria-busy={isRefreshing}
      className={cn(
        gridClasses,
        'list-none transition-opacity',
        isRefreshing && 'opacity-60'
      )}
    >
      {state.data.map((department) => (
        <li key={department.code} className="flex">
          <DepartmentCard
            department={department}
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

export { DepartmentGrid }

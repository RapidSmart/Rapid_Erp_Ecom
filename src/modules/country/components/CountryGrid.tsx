import { Globe, SearchX, TriangleAlert } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { CountryCard } from './CountryCard'
import { CountryCardSkeleton } from './skeleton/CountryCardSkeleton'
import { CountryFeedback } from './CountryFeedback'
import type { CountryGridProps } from '../types/country.types'

const SKELETON_COUNT = 8

const gridClasses =
  'grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-x-3.5 gap-y-5'


function CountryGrid({
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
}: CountryGridProps) {
  const { t } = useTranslation()

  if (state.status === 'loading') {
    return (
      <div className={gridClasses} role="status" aria-busy="true">
        <span className="sr-only">{t('country.states.loading')}</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <CountryCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <CountryFeedback
        icon={TriangleAlert}
        tone="danger"
        title={t('country.states.errorTitle')}
        body={state.error.message}
        actionLabel={t('country.states.errorAction')}
        onAction={onRetry}
      />
    )
  }

  if (state.data.length === 0) {
    return isFiltered ? (
      <CountryFeedback
        icon={SearchX}
        title={t('country.states.noResultsTitle')}
        body={t('country.states.noResultsBody')}
        actionLabel={t('country.states.noResultsAction')}
        onAction={onClearFilters}
      />
    ) : (
      <CountryFeedback
        icon={Globe}
        title={t('country.states.emptyTitle')}
        body={t('country.states.emptyBody')}
        actionLabel={t('country.states.emptyAction')}
        onAction={onAdd}
      />
    )
  }

  return (
    <ul
      aria-label={t('country.listing.grid')}
      aria-busy={isRefreshing}
      className={cn(
        gridClasses,
        'list-none transition-opacity',
        isRefreshing && 'opacity-60'
      )}
    >
      {state.data.map((country) => (
        <li key={country.id} className="flex">
          <CountryCard
            country={country}
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

export { CountryGrid }

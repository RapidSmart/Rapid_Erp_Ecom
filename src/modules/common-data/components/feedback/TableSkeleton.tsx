import { useTranslation } from '@/i18n'
import type { TableSkeletonProps } from '../../types/common-data.types'

export function TableSkeleton({ rowCount = 8 }: TableSkeletonProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col divide-y divide-surface-border" role="status" aria-busy="true">
      <span className="sr-only">{t('common.states.loading')}</span>
      {Array.from({ length: rowCount }, (_, index) => (
        <div key={index} className="flex items-center gap-4 px-4 py-3.5">
          <span className="size-4 shrink-0 animate-pulse rounded-[4px] bg-surface-muted" />
          <span className="h-5 w-32 shrink-0 animate-pulse rounded-full bg-surface-muted" />
          <span className="ml-auto h-3 w-40 animate-pulse rounded-full bg-surface-muted" />
        </div>
      ))}
    </div>
  )
}

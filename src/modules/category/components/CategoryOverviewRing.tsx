import type { CategoryStatus } from '../types/category.types'
import { CategoryOverviewRingIcon } from './icons/CategoryOverviewRingIcon'

export interface CategoryOverviewRingProps {
  status: CategoryStatus
  percentage: number
}

function CategoryOverviewRing({ status, percentage }: CategoryOverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <CategoryOverviewRingIcon status={status} percentage={percentage} />
      <span
        className="text-[11px] font-bold"
        style={{ color: `var(--status-${status}-ink)` }}
      >
        {new Intl.NumberFormat(undefined, { style: 'percent' }).format(
          clamped / 100
        )}
      </span>
    </span>
  )
}

export { CategoryOverviewRing }

import type { SubCategoryStatus } from '../types/sub-category.types'
import { SubCategoryOverviewRingIcon } from './icons/SubCategoryOverviewRingIcon'

export interface SubCategoryOverviewRingProps {
  status: SubCategoryStatus
  percentage: number
}

function SubCategoryOverviewRing({ status, percentage }: SubCategoryOverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <SubCategoryOverviewRingIcon status={status} percentage={percentage} />
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

export { SubCategoryOverviewRing }

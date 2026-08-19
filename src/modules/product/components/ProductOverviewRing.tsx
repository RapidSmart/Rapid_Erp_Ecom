import type { ProductStatus } from '../types/product.types'
import { ProductOverviewRingIcon } from './icons/ProductOverviewRingIcon'

export interface ProductOverviewRingProps {
  status: ProductStatus
  percentage: number
}

function ProductOverviewRing({ status, percentage }: ProductOverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <ProductOverviewRingIcon status={status} percentage={percentage} />
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

export { ProductOverviewRing }

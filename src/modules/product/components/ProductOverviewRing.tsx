import type { ProductStatus } from '../types/product.types'

const VIEWBOX = 64
const CENTER = VIEWBOX / 2
const RADIUS = 26
const STROKE_WIDTH = 6
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export interface ProductOverviewRingProps {
  status: ProductStatus
  percentage: number
}

function ProductOverviewRing({ status, percentage }: ProductOverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))
  const arcLength = (clamped / 100) * CIRCUMFERENCE

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={`var(--status-${status}-ink)`}
          strokeWidth={STROKE_WIDTH}
          opacity={0.2}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={`var(--status-${status}-ink)`}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`}
        />
      </svg>
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

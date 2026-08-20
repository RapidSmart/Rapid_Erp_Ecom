import type { OverviewRingProps } from '../../types/common-data.types'
import { OverviewRingIcon } from './OverviewRingIcon'

export function OverviewRing({ status, percentage }: OverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <OverviewRingIcon status={status} percentage={percentage} />
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

import type { CountryStatus } from '../types/country.types'
import { CountryOverviewRingIcon } from './icons/CountryOverviewRingIcon'

export interface CountryOverviewRingProps {
  status: CountryStatus
  percentage: number
}

function CountryOverviewRing({ status, percentage }: CountryOverviewRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <span className="relative flex size-16 shrink-0 items-center justify-center">
      <CountryOverviewRingIcon status={status} percentage={percentage} />
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

export { CountryOverviewRing }

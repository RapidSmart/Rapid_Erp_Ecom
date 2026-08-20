import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { RAK_TIME_RANGES } from '../constants/rak-overview.data'
import type { RakTimeRange } from '../types/rak.types'

export interface RakRangeSwitchProps {
  range: RakTimeRange
  onRangeChange: (range: RakTimeRange) => void
}

/** Live / 6 hours / 24 hours / 7 days / 30 days pill group — shared by both overview panels. */
function RakRangeSwitch({ range, onRangeChange }: RakRangeSwitchProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('rak.overview.rangeLabel')}
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-surface-border p-1"
    >
      {RAK_TIME_RANGES.map((option) => {
        const isActive = option.value === range

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onRangeChange(option.value)}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-rak focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              isActive
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-surface-border text-ink-muted hover:bg-surface-muted hover:text-ink'
            )}
          >
            {isActive && (
              <span
                className="size-1.5 rounded-full bg-current"
                aria-hidden="true"
              />
            )}
            {t(option.labelKey)}
          </button>
        )
      })}
    </div>
  )
}

export { RakRangeSwitch }

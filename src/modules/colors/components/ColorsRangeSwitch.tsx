import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { COLOR_TIME_RANGES } from '../constants/colors-overview.data'
import type { ColorTimeRange } from '../types/colors.types'

export interface ColorsRangeSwitchProps {
  range: ColorTimeRange
  onRangeChange: (range: ColorTimeRange) => void
}

/** Live / 6 hours / 24 hours / 7 days / 30 days pill group — shared by both overview panels. */
function ColorsRangeSwitch({ range, onRangeChange }: ColorsRangeSwitchProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('colors.overview.rangeLabel')}
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-surface-border p-1"
    >
      {COLOR_TIME_RANGES.map((option) => {
        const isActive = option.value === range

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onRangeChange(option.value)}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
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

export { ColorsRangeSwitch }

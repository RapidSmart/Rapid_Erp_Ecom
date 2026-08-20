import { useTranslation } from '@/i18n'
import { cn } from '@/shared/utils/utils'
import { SUB_CATEGORY_TIME_RANGES } from '../constants/sub-category-overview.data'
import type { SubCategoryTimeRange } from '../types/sub-category.types'

export interface SubCategoryRangeSwitchProps {
  range: SubCategoryTimeRange
  onRangeChange: (range: SubCategoryTimeRange) => void
}

function SubCategoryRangeSwitch({ range, onRangeChange }: SubCategoryRangeSwitchProps) {
  const { t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('subCategory.overview.rangeLabel')}
      className="flex flex-wrap items-center gap-1.5 rounded-xl border border-surface-border p-1"
    >
      {SUB_CATEGORY_TIME_RANGES.map((option) => {
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
                ? 'border-brand-accent-border bg-brand-accent-surface text-brand-accent'
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

export { SubCategoryRangeSwitch }

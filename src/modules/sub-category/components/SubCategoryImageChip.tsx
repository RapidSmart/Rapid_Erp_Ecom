import type { SubCategoryImageChipProps } from '../types/sub-category.types'
import { cn } from '@/shared/utils/utils'

export function SubCategoryImageChip({ item, selected, onClick }: SubCategoryImageChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative h-[38px] w-[56px] overflow-hidden rounded-[6px] border border-solid transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        selected
          ? 'border-blue-600 scale-[1.04] shadow-sm'
          : 'border-surface-border hover:border-slate-400 hover:scale-[1.02]'
      )}
      aria-label={`Select image: ${item.label}`}
      aria-pressed={selected}
    >
      <img
        src={item.url}
        alt={item.label}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </button>
  )
}

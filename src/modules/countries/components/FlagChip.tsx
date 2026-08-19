import { cn } from '@/shared/utils'
import type { FlagChipProps } from '../types/country.types'

export function FlagChip({ item, selected, onClick }: FlagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select ${item.code} flag`}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-[34px] items-center gap-2 rounded-full border bg-gray-100 pl-[7px] pr-[10px]',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        selected ? 'border-blue-400 ring-1 ring-blue-400' : 'border-slate-200',
      )}
    >
      <span
        className="inline-block h-4 w-6 shrink-0 rounded-[3px] border border-slate-300"
        style={{ backgroundImage: item.flagGradient, backgroundSize: 'cover' }}
        aria-hidden="true"
      />
      <span className="font-mono text-[11.5px] text-slate-600">{item.code}</span>
    </button>
  )
}

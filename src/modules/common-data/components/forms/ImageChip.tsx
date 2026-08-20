import { cn } from '@/shared/utils/utils'
import type { ImageChipProps } from '../../types/common-data.types'

export function ImageChip({ item, selected, onClick }: ImageChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={item.label ?? item.code ?? 'Gallery item'}
      className={cn(
        'group relative flex h-[38px] cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border border-solid transition-all',
        selected
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-surface-border hover:border-slate-300',
      )}
    >
      {item.url ? (
        <img
          src={item.url}
          alt={item.label ?? 'Gallery item'}
          className="h-full w-full object-cover"
        />
      ) : item.flagGradient ? (
        <div
          className="h-full w-full"
          style={{ background: item.flagGradient }}
          aria-hidden="true"
        />
      ) : (
        <span className="text-xs text-slate-500">{item.label ?? item.code}</span>
      )}
    </button>
  )
}

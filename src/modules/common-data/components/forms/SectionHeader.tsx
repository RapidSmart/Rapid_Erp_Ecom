import type { SectionHeaderProps } from '../../types/common-data.types'

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-200" aria-hidden="true" />
    </div>
  )
}

export interface SectionHeaderProps {
  label: string
}

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <h3 className="mb-3.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
      {label}
    </h3>
  )
}

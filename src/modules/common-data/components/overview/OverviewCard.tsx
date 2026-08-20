import { OverviewRing } from './OverviewRing'
import type { OverviewCardProps } from '../../types/common-data.types'

export function OverviewCard({
  status,
  label,
  value,
  percentage,
  selected = false,
  actionLabel,
  onSelect,
}: OverviewCardProps) {
  const content = (
    <>
      <OverviewRing status={status} percentage={percentage} />
      <span className="flex flex-col gap-1">
        <span className="text-2xl leading-none font-bold text-ink">
          {new Intl.NumberFormat().format(value)}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: `var(--status-${status}-ink)` }}
            aria-hidden="true"
          />
          {label}
        </span>
      </span>
    </>
  )

  const backgroundStyle = { backgroundColor: `var(--status-${status}-surface)` }

  if (!onSelect) {
    return (
      <div
        className="flex w-full items-center gap-3 rounded-2xl px-4 py-4"
        style={backgroundStyle}
      >
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={actionLabel ?? `Filter by ${label}`}
      style={{
        ...backgroundStyle,
        boxShadow: selected ? `0 0 0 2px var(--status-${status}-ink)` : undefined,
      }}
      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-4 text-left outline-none transition-shadow hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {content}
    </button>
  )
}

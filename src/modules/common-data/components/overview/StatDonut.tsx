import { useId } from 'react'
import { cn } from '@/shared/utils/utils'
import type { StatDonutProps, StatTone } from '../../types/common-data.types'

const VIEWBOX = 120
const CENTER = VIEWBOX / 2
const RADIUS = 53.5
const STROKE_WIDTH = 13
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARC_START_DEGREES = 95
const ARC_SWEEP_DEGREES = 305

const toneTextClasses: Record<StatTone, string> = {
  total: 'text-stat-total',
  active: 'text-stat-active',
  inactive: 'text-stat-inactive',
  draft: 'text-stat-draft',
  delete: 'text-stat-delete',
}

export function StatDonut({
  tone,
  label,
  value,
  percentage,
  selected = false,
  actionLabel,
  onSelect,
}: StatDonutProps) {
  const gradientId = useId()
  const arcLength = (ARC_SWEEP_DEGREES / 360) * CIRCUMFERENCE
  const toneText = toneTextClasses[tone]

  const content = (
    <>
      <svg
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className="absolute inset-0 size-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`var(--stat-${tone}-from)`} />
            <stop offset="100%" stopColor={`var(--stat-${tone}-to)`} />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--stat-track)"
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`}
          transform={`rotate(${ARC_START_DEGREES} ${CENTER} ${CENTER})`}
        />
      </svg>

      <span className="relative flex flex-col items-center gap-1.5">
        <span className={cn('text-[26px] leading-none font-bold', toneText)}>
          {new Intl.NumberFormat().format(value)}
        </span>
        <span className={cn('text-[13px] leading-none font-medium', toneText)}>
          {label}
        </span>
      </span>

      <span
        className={cn(
          'absolute inset-x-0 bottom-1 text-center text-[11px] font-semibold',
          toneText
        )}
      >
        {new Intl.NumberFormat(undefined, { style: 'percent' }).format(
          percentage / 100
        )}
      </span>
    </>
  )

  const shellClasses = cn(
    'relative flex size-29.5 shrink-0 items-center justify-center rounded-full transition-colors',
    selected && 'bg-surface-muted'
  )

  if (!onSelect) {
    return <div className={shellClasses}>{content}</div>
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={actionLabel}
      className={cn(
        shellClasses,
        'cursor-pointer hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'
      )}
    >
      {content}
    </button>
  )
}

import type { OverviewRingIconProps } from '../../types/common-data.types'

const VIEWBOX = 64
const CENTER = VIEWBOX / 2
const RADIUS = 26
const STROKE_WIDTH = 6
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function OverviewRingIcon({ status, percentage }: OverviewRingIconProps) {
  const clamped = Math.min(100, Math.max(0, percentage))
  const arcLength = (clamped / 100) * CIRCUMFERENCE

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="absolute inset-0 size-full -rotate-90"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke={`var(--status-${status}-ink)`}
        strokeWidth={STROKE_WIDTH}
        opacity={0.2}
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke={`var(--status-${status}-ink)`}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${CIRCUMFERENCE}`}
      />
    </svg>
  )
}

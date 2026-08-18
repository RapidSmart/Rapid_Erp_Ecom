import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconChevronLeft({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M10 4L6 8L10 12" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
    </svg>
  )
}

import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconChevronDown({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M7 10L12 15L17 10" stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42" />
    </svg>
  )
}

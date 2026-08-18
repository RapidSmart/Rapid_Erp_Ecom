import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconDuplicate({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="15" viewBox="0 0 15 15" width="15" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M3.125 9.375V3.125H9.375M5.625 5.625H11.875V11.875H5.625V5.625Z" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  )
}

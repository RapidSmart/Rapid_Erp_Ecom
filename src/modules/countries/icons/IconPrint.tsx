import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconPrint({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="15" viewBox="0 0 15 15" width="15" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M4.375 5.625V2.5H10.625V5.625M4.375 10.625H3.125V6.875H11.875V10.625H10.625M4.375 8.75H10.625V12.5H4.375V8.75Z" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  )
}

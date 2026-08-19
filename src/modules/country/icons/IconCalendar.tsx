import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconCalendar({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="17" viewBox="0 0 18.275 17" width="18" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M15.2375 0.6375H3.0375C1.71202 0.6375 0.6375 1.71202 0.6375 3.0375V13.2375C0.6375 14.563 1.71202 15.6375 3.0375 15.6375H15.2375C16.563 15.6375 17.6375 14.563 17.6375 13.2375V3.0375C17.6375 1.71202 16.563 0.6375 15.2375 0.6375Z" stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
      <path d="M0.6375 0.6375H17.6375M6.6375 0.6375V10.6375" stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
    </svg>
  )
}

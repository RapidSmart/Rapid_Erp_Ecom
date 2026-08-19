import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconUpload({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M12 16V4M16.5 8.5L12 4L7.5 8.5" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
      <path d="M4 15V18.5C4 18.8978 4.15804 19.2794 4.43934 19.5607C4.72064 19.842 5.10218 20 5.5 20H18.5C18.8978 20 19.2794 19.842 19.5607 19.5607C19.842 19.2794 20 18.8978 20 18.5V15" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  )
}

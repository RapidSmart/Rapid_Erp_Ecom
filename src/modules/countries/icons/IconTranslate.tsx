import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconTranslate({ className = "" }: IconProps) {
  return (
    <svg fill="none" height="16" viewBox="0 0 18.35 15.35" width="18" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M0.673072 0.672917H9.67307M5.17307 0.672917V2.17292C5.17307 5.77292 3.17307 8.17292 0.673072 9.37292M2.67307 5.17292C4.07307 7.77292 6.07307 9.17292 8.17307 9.77292M9.67307 14.6729L13.6731 4.67292L17.6731 14.6729M11.2731 11.3729H16.0731" stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  )
}

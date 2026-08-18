import { cn } from '@/shared/utils'

export interface IconProps {
  className?: string
}

export function IconClose({ className = "" }: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-[15px] shrink-0", className)}
    >
      <path
        d="M11.25 3.75L3.75 11.25M3.75 3.75L11.25 11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

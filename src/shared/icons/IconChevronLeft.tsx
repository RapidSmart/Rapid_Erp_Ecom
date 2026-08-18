import { cn } from "@/shared/utils";

export interface IconProps {
  className?: string;
}

export function IconChevronLeft({ className = "" }: IconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path
        d="M8.75 3.5L5.25 7L8.75 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

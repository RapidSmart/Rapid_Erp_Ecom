import type { ChangeEvent, ReactNode } from 'react'
import { cn } from '@/shared/utils'

interface PillInputProps {
  id: string
  placeholder: string
  value: string
  type?: 'text' | 'tel'
  rightIcon?: ReactNode
  required?: boolean
  onChange: (value: string) => void
}

export function PillInput({
  id,
  placeholder,
  value,
  type = 'text',
  rightIcon,
  required,
  onChange,
}: PillInputProps) {
  return (
    <div className="relative h-[54px]">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        className={cn(
          'h-full w-full rounded-full border border-transparent bg-gray-100',
          'px-[22px] text-[15px] text-slate-900 placeholder:text-slate-400',
          'outline-none transition-colors focus:border-blue-400',
          rightIcon && 'pr-12',
        )}
      />
      {rightIcon && (
        <div className="absolute right-[14px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

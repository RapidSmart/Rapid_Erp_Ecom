import type { ChangeEvent } from 'react'
import { cn } from '@/shared/utils'
import type { PillSelectProps } from '../types/country.types'
import { IconChevronDown } from '../icons'

export function PillSelect({
  id,
  placeholder,
  value,
  options,
  required,
  error,
  onChange,
  onBlur,
  prefix,
}: PillSelectProps & { error?: boolean; onBlur?: () => void }) {
  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div className="relative h-[54px]">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center gap-[10px] rounded-full px-[22px] border transition-colors",
          error ? "border-red-400 bg-red-50/30" : "border-transparent bg-gray-100"
        )}
        aria-hidden="true"
      >
        {prefix}
        <span
          className={cn(
            'flex-1 truncate text-[15px]',
            value ? 'text-slate-900' : 'text-slate-400',
          )}
        >
          {selectedLabel ?? placeholder}
        </span>
        <IconChevronDown />
      </div>

      <select
        id={id}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required}
        className="absolute inset-0 h-full w-full cursor-pointer rounded-full opacity-0"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

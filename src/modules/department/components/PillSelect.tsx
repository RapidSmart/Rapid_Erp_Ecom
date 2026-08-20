import type { ChangeEvent } from 'react'
import { cn } from '@/shared/utils/utils'
import type { PillSelectProps } from '../types/department.types'
import { ChevronDown } from 'lucide-react'

export function PillSelect({
  id,
  placeholder,
  value,
  options,
  required,
  onChange,
  prefix,
}: PillSelectProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div className="relative h-[54px]">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>

      <div
        className="pointer-events-none absolute inset-0 flex items-center gap-[10px] rounded-full bg-gray-100 px-[22px]"
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
        <ChevronDown className="size-4 text-slate-400" />
      </div>

      <select
        id={id}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
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

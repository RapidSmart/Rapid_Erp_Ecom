import { useState } from 'react'
import { cn } from '@/shared/utils/utils'
import { Building2 } from 'lucide-react'
import type { DepartmentImageProps } from '../types/department.types'

export function DepartmentImage({ imageUrl, name, className }: DepartmentImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-muted ring-1 ring-surface-border',
        className
      )}
      aria-hidden="true"
    >
      {failed || !imageUrl ? (
        <Building2 className="size-4 text-ink-subtle" />
      ) : (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </span>
  )
}

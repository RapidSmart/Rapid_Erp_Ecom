import { useState } from 'react'
import { cn } from '@/shared/utils/utils'
import { Package } from 'lucide-react'
import type { ProductImageProps } from '../types/product.types'

function ProductImage({ imageUrl, name, className }: ProductImageProps) {
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
        <Package className="size-4 text-ink-subtle" />
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

export { ProductImage }

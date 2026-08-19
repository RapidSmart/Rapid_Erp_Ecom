import { useState } from 'react'
import { cn } from '@/shared/utils/utils'

export interface CountryFlagProps {
  iso2: string
  className?: string
}

const FLAG_WIDTH = 28
const FLAG_HEIGHT = 20

/**
 * Flags are resolved from the ISO2 code so any country added later renders
 * without a code change. If the asset is unavailable the code itself is shown.
 */
function CountryFlag({ iso2, className }: CountryFlagProps) {
  const [failed, setFailed] = useState(false)
  const code = iso2.toLowerCase()

  return (
    <span
      className={cn(
        'flex h-5 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-surface-muted ring-1 ring-surface-border',
        className
      )}
      aria-hidden="true"
    >
      {failed ? (
        <span className="text-[9px] font-semibold text-ink-subtle">
          {iso2.toUpperCase()}
        </span>
      ) : (
        <img
          src={`https://flagcdn.com/w80/${code}.png`}
          srcSet={`https://flagcdn.com/w40/${code}.png 1x, https://flagcdn.com/w80/${code}.png 2x`}
          alt=""
          width={FLAG_WIDTH}
          height={FLAG_HEIGHT}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </span>
  )
}

export { CountryFlag }

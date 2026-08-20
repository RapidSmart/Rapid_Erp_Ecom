import { resolveRakSwatch } from '../constants/rak-swatches.data'
import type { Rak } from '../types/rak.types'

export interface RakSwatchProps {
  rak: Rak
  size?: 'sm' | 'md'
}

function RakSwatch({ rak, size = 'sm' }: RakSwatchProps) {
  return (
    <span
      role="img"
      aria-label={rak.name}
      title={rak.name}
      className={`inline-block shrink-0 rounded-full border border-black/10 ${size === 'sm' ? 'size-4' : 'size-5'}`}
      style={{ backgroundColor: resolveRakSwatch(rak) }}
    />
  )
}

export { RakSwatch }
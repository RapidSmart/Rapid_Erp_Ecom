import { resolveColorSwatch } from '../constants/color-swatches.data'
import type { Color } from '../types/colors.types'

export interface ColorSwatchProps {
  color: Color
  size?: 'sm' | 'md'
}

function ColorSwatch({ color, size = 'sm' }: ColorSwatchProps) {
  return (
    <span
      role="img"
      aria-label={color.name}
      title={color.name}
      className={`inline-block shrink-0 rounded-full border border-black/10 ${size === 'sm' ? 'size-4' : 'size-5'}`}
      style={{ backgroundColor: resolveColorSwatch(color) }}
    />
  )
}

export { ColorSwatch }
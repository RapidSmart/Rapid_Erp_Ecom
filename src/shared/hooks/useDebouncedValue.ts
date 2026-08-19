import { useEffect, useState } from 'react'

/**
 * Returns `value` only after it has stayed unchanged for `delay` milliseconds.
 * Use it for high-frequency inputs (search boxes, resize handlers) instead of
 * scattering `setTimeout` calls across components.
 */
export function useDebouncedValue<TValue>(value: TValue, delay = 300): TValue {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay)

    return () => window.clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

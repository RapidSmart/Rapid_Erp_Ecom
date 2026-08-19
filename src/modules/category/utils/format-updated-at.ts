const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatUpdatedAt(
  isoDate: string,
  locale = 'en',
  now = Date.now()
): string {
  const timestamp = new Date(isoDate).getTime()

  if (Number.isNaN(timestamp)) {
    return ''
  }

  const elapsed = Math.max(0, now - timestamp)
  const exact = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })
  const relaxed = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (elapsed < HOUR) {
    return capitalize(relaxed.format(0, 'day'))
  }

  if (elapsed < DAY) {
    return capitalize(exact.format(-Math.floor(elapsed / HOUR), 'hour'))
  }

  if (elapsed < 2 * DAY) {
    return capitalize(relaxed.format(-1, 'day'))
  }

  if (elapsed < WEEK) {
    return capitalize(exact.format(-Math.floor(elapsed / DAY), 'day'))
  }

  if (elapsed < MONTH) {
    return capitalize(exact.format(-Math.floor(elapsed / WEEK), 'week'))
  }

  if (elapsed < YEAR) {
    return capitalize(exact.format(-Math.floor(elapsed / MONTH), 'month'))
  }

  return capitalize(exact.format(-Math.floor(elapsed / YEAR), 'year'))
}

export function formatUpdatedAtCompact(
  isoDate: string,
  locale = 'en',
  now = Date.now()
): string {
  const timestamp = new Date(isoDate).getTime()

  if (Number.isNaN(timestamp)) {
    return ''
  }

  const elapsed = Math.max(0, now - timestamp)

  if (elapsed < HOUR) {
    return capitalize(
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'hour')
    )
  }

  if (elapsed < DAY) {
    const hours = Math.max(1, Math.floor(elapsed / HOUR))

    return capitalize(
      new Intl.RelativeTimeFormat(locale, { numeric: 'always' }).format(
        -hours,
        'hour'
      )
    )
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(timestamp))
}

export function formatUpdatedAtFull(isoDate: string, locale = 'en'): string {
  const timestamp = new Date(isoDate)

  if (Number.isNaN(timestamp.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp)
}

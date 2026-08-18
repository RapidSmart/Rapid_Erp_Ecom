import { SVG_PATHS } from '../constants/mock.countries'

export function IconCalendar() {
  return (
    <svg fill="none" height="17" viewBox="0 0 18.275 17" width="18" aria-hidden="true">
      <path d={SVG_PATHS.calendarRect} stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
      <path d={SVG_PATHS.calendarLines} stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
    </svg>
  )
}

export function IconTranslate() {
  return (
    <svg fill="none" height="16" viewBox="0 0 18.35 15.35" width="18" aria-hidden="true">
      <path d={SVG_PATHS.translate} stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  )
}

export function IconUpload() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
      <path d={SVG_PATHS.uploadArrow} stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
      <path d={SVG_PATHS.uploadTray} stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </svg>
  )
}

export function IconDuplicate() {
  return (
    <svg fill="none" height="15" viewBox="0 0 15 15" width="15" aria-hidden="true">
      <path d={SVG_PATHS.duplicate} stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  )
}

export function IconPrint() {
  return (
    <svg fill="none" height="15" viewBox="0 0 15 15" width="15" aria-hidden="true">
      <path d={SVG_PATHS.print} stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
    </svg>
  )
}

export function IconChevronDown() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true" className="shrink-0">
      <path d="M7 10L12 15L17 10" stroke="#64748b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.42" />
    </svg>
  )
}

export function IconChevronLeft() {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" aria-hidden="true">
      <path d="M10 4L6 8L10 12" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
    </svg>
  )
}

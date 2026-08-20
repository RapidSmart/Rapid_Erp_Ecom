import { cn } from '@/shared/utils'
import type { FormFooterProps } from '../types/country.types'
import { IconDuplicate, IconPrint } from '../icons'

import { Pointer, FileText, Printer } from 'lucide-react'

export function FormFooter({
  filledCount,
  totalCount,
  filledText,
  duplicateText,
  printText,
  clearText,
  saveText,
  stayOnPage,
  onToggleStayOnPage,
  onPrint,
  onClear,
  onSave,
}: FormFooterProps) {
  const allFilled = filledCount >= totalCount

  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleStayOnPage}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              stayOnPage 
                ? "bg-[#0371df] text-white hover:opacity-90" 
                : "bg-blue-300 text-slate-900 hover:bg-blue-400"
            )}
            title={duplicateText}
          >
            <Pointer className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 text-slate-900 transition-colors hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            title="Export PDF"
          >
            <FileText className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 text-slate-900 transition-colors hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            title={printText}
          >
            <Printer className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
        <div className="hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />
        <span className="text-[12px] text-slate-500 sm:text-[12.5px]">
          {filledText}
        </span>
      </div>

      <div className="flex items-center gap-2.5 sm:shrink-0 sm:gap-[10px]">
        <button
          type="button"
          onClick={onClear}
          className="flex h-[42px] flex-1 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:h-[46px] sm:w-[140px] sm:flex-initial sm:text-sm"
        >
          {clearText}
        </button>
        <button
          type="submit"
          onClick={onSave}
          disabled={!allFilled}
          className={cn(
            'flex h-[42px] flex-1 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-[46px] sm:w-[140px] sm:flex-initial sm:text-sm',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            allFilled ? 'bg-[#0371df] hover:opacity-90' : 'cursor-not-allowed bg-blue-300',
          )}
          aria-disabled={!allFilled}
        >
          {saveText}
        </button>
      </div>
    </footer>
  )
}

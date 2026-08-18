import { cn } from '@/shared/utils'
import { IconDuplicate, IconPrint } from './Icons'

interface FormFooterProps {
  filledCount: number
  totalCount: number
  filledText: string
  duplicateText: string
  printText: string
  clearText: string
  saveText: string
  onDuplicate: () => void
  onPrint: () => void
  onClear: () => void
  onSave: () => void
}

export function FormFooter({
  filledCount,
  totalCount,
  filledText,
  duplicateText,
  printText,
  clearText,
  saveText,
  onDuplicate,
  onPrint,
  onClear,
  onSave,
}: FormFooterProps) {
  const allFilled = filledCount >= totalCount

  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-[12px] text-slate-500 sm:text-[12.5px]">
          {filledText}
        </span>
        <div className="hidden h-5 w-px bg-slate-200 sm:block" aria-hidden="true" />
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onDuplicate}
            className="inline-flex h-[32px] items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:h-[34px] sm:px-3 sm:text-[12.5px]"
          >
            <IconDuplicate />
            {duplicateText}
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-[32px] items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:h-[34px] sm:px-3 sm:text-[12.5px]"
          >
            <IconPrint />
            {printText}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:shrink-0 sm:gap-[10px]">
        <button
          type="button"
          onClick={onClear}
          className="h-[42px] flex-1 rounded-full border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:h-[46px] sm:flex-initial sm:px-7 sm:text-sm"
        >
          {clearText}
        </button>
        <button
          type="submit"
          onClick={onSave}
          disabled={!allFilled}
          className={cn(
            'h-[42px] flex-1 rounded-full bg-blue-600 px-6 text-xs font-semibold text-white sm:h-[46px] sm:flex-initial sm:px-8 sm:text-sm',
            'transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            allFilled ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50',
          )}
          aria-disabled={!allFilled}
        >
          {saveText}
        </button>
      </div>
    </footer>
  )
}

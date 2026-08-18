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
    <footer className="flex items-center gap-4 border-t border-slate-200 pt-5">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="whitespace-nowrap text-[12.5px] text-slate-500">
          {filledText}
        </span>
        <div className="h-5 w-px shrink-0 bg-slate-200" aria-hidden="true" />
        <button
          type="button"
          onClick={onDuplicate}
          className="inline-flex h-[34px] items-center gap-[7px] rounded-full px-3 text-[12.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <IconDuplicate />
          {duplicateText}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex h-[34px] items-center gap-[7px] rounded-full px-3 text-[12.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <IconPrint />
          {printText}
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-[10px]">
        <button
          type="button"
          onClick={onClear}
          className="h-[46px] rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {clearText}
        </button>
        <button
          type="submit"
          onClick={onSave}
          disabled={!allFilled}
          className={cn(
            'h-[46px] rounded-full bg-blue-600 px-8 text-sm font-semibold text-white',
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

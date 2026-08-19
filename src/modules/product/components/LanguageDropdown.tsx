import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import type {
  LanguageDropdownProps,
  LanguageTranslationValues,
} from '../types/product.types'
import { Languages } from 'lucide-react'

export function LanguageDropdown({
  initialValues,
  onSave,
  currentLanguage: _currentLanguage,
  onSelectLanguage: _onSelectLanguage,
}: LanguageDropdownProps) {
  const [open, setOpen] = useState(false)
  const [translations, setTranslations] = useState<LanguageTranslationValues>({
    arabic: initialValues?.arabic ?? '',
    hindi: initialValues?.hindi ?? '',
    urdu: initialValues?.urdu ?? '',
    bangla: initialValues?.bangla ?? '',
  })

  const handleChange = (key: keyof LanguageTranslationValues, value: string) => {
    setTranslations((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave?.(translations)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        aria-label="Product name translations"
        className="group flex size-8 items-center justify-center rounded-full text-slate-400 outline-none transition-all hover:bg-slate-200/70 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <Languages className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[340px] sm:w-[370px] rounded-[24px] border border-[#edf0f6] bg-white p-6 shadow-[0px_24px_48px_-20px_rgba(12,21,34,0.34)] transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        {/* Figma Header */}
        <h3 className="mb-5 text-[16px] font-bold tracking-tight text-[#0f172a]">
          Product name — translations
        </h3>

        {/* Translation Inputs Stack */}
        <div className="space-y-3.5">
          <div>
            <label htmlFor="translation-arabic" className="sr-only">
              Arabic
            </label>
            <input
              id="translation-arabic"
              type="text"
              value={translations.arabic}
              onChange={(e) => handleChange('arabic', e.target.value)}
              placeholder="Arabic"
              className="h-[48px] w-full rounded-full bg-[#f4f6f9] px-5 text-[14.5px] text-slate-900 placeholder:text-[#8a99ad] outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="translation-hindi" className="sr-only">
              Hindi
            </label>
            <input
              id="translation-hindi"
              type="text"
              value={translations.hindi}
              onChange={(e) => handleChange('hindi', e.target.value)}
              placeholder="Hindi"
              className="h-[48px] w-full rounded-full bg-[#f4f6f9] px-5 text-[14.5px] text-slate-900 placeholder:text-[#8a99ad] outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="translation-urdu" className="sr-only">
              Urdu
            </label>
            <input
              id="translation-urdu"
              type="text"
              value={translations.urdu}
              onChange={(e) => handleChange('urdu', e.target.value)}
              placeholder="Urdu"
              className="h-[48px] w-full rounded-full bg-[#f4f6f9] px-5 text-[14.5px] text-slate-900 placeholder:text-[#8a99ad] outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="translation-bangla" className="sr-only">
              Bangla
            </label>
            <input
              id="translation-bangla"
              type="text"
              value={translations.bangla}
              onChange={(e) => handleChange('bangla', e.target.value)}
              placeholder="Bangla"
              className="h-[48px] w-full rounded-full bg-[#f4f6f9] px-5 text-[14.5px] text-slate-900 placeholder:text-[#8a99ad] outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Figma Save Button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={handleSave}
            className="h-[48px] w-full rounded-full bg-[#0066FF] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Save
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { IconTranslate } from './Icons'
import { Check, Search } from 'lucide-react'

export interface LanguageOption {
  code: string
  label: string
  flag?: string
}

const DEFAULT_LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'fr', label: 'French (Français)', flag: '🇫🇷' },
  { code: 'de', label: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'ar', label: 'Arabic (العربية)', flag: '🇦🇪' },
  { code: 'bn', label: 'Bengali (বাংলা)', flag: '🇧🇩' },
  { code: 'zh', label: 'Chinese (中文)', flag: '🇨🇳' },
  { code: 'jp', label: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'pt', label: 'Portuguese (Português)', flag: '🇵🇹' },
  { code: 'ru', label: 'Russian (Русский)', flag: '🇷🇺' },
]

interface LanguageDropdownProps {
  currentLanguage?: string
  languages?: readonly LanguageOption[]
  onSelectLanguage?: (lang: LanguageOption) => void
}

export function LanguageDropdown({
  currentLanguage = 'en',
  languages = DEFAULT_LANGUAGES,
  onSelectLanguage,
}: LanguageDropdownProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLang, setSelectedLang] = useState<string>(currentLanguage)

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Select translation language"
          className="group flex size-8 items-center justify-center rounded-full text-slate-400 outline-none transition-all hover:bg-slate-200/70 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <IconTranslate />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md transition-all duration-200 ease-out animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Translation Languages
          </DropdownMenuLabel>

          {/* Search Input Filter */}
          <div className="relative px-1 py-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="h-8 w-full rounded-xl bg-slate-100/80 pl-8 pr-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-blue-400"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>

          <DropdownMenuSeparator className="my-1.5 bg-slate-100" />

          {/* Language Options List */}
          <div className="max-h-52 overflow-y-auto space-y-0.5 pr-0.5">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = selectedLang === lang.code
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code)
                      onSelectLanguage?.(lang)
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                  >
                    <div className="flex items-center gap-2">
                      {lang.flag && <span className="text-sm">{lang.flag}</span>}
                      <span>{lang.label}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-blue-500" />}
                  </DropdownMenuItem>
                )
              })
            ) : (
              <div className="py-3 text-center text-xs text-slate-400">
                No matching languages
              </div>
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

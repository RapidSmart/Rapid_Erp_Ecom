import { ChevronLeft, ChevronRight, Moon } from 'lucide-react'
import { cn } from '@/shared/utils/utils'
import { primaryNavItems } from './nav-items.data'

export interface SidebarProps {
  activeItemId?: string
  collapsed?: boolean
  onToggleCollapse?: () => void
  onNavigate?: (itemId: string) => void
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

function Sidebar({
  activeItemId = 'country',
  collapsed = false,
  onToggleCollapse,
  onNavigate,
  darkMode = false,
  onToggleDarkMode,
}: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        'flex h-svh shrink-0 flex-col bg-[#3461FD] text-white transition-[width] duration-200',
        collapsed ? 'w-[84px]' : 'w-[248px]'
      )}
    >
      <div className="flex h-[84px] shrink-0 items-center justify-between px-6">
        {!collapsed && (
          <span className="text-[22px] font-extrabold tracking-wide text-white">
            RAPID
          </span>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          {collapsed ? (
            <ChevronRight className="size-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4" aria-label="Primary">
        {primaryNavItems.map((item) => {
          const isActive = item.id === activeItemId
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex h-12 shrink-0 items-center gap-3 rounded-xl px-4 text-[15px] font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-white text-[#3461FD] shadow-sm'
                  : 'text-white/90 hover:bg-white/10'
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-white/15 px-4 py-4">
        <div
          className={cn(
            'flex h-12 items-center gap-3 rounded-xl px-4 text-[15px] font-medium text-white/90',
            collapsed && 'justify-center px-0'
          )}
        >
          <Moon className="size-5 shrink-0" aria-hidden="true" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-left">Dark mode</span>
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label="Toggle dark mode"
                onClick={onToggleDarkMode}
                className={cn(
                  'relative h-5 w-9 shrink-0 rounded-full transition-colors',
                  darkMode ? 'bg-white' : 'bg-white/25'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 size-4 rounded-full transition-transform',
                    darkMode ? 'translate-x-[18px] bg-[#3461FD]' : 'translate-x-0.5 bg-white'
                  )}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export { Sidebar }

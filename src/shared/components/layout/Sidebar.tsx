import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Moon } from 'lucide-react'
import { cn } from '@/shared/utils/utils'
import { primaryNavItems } from './nav-items.data'

export interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

function Sidebar({
  collapsed = false,
  onToggleCollapse,
  darkMode = false,
  onToggleDarkMode,
}: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        'flex h-svh shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-base font-bold tracking-wide text-sidebar-foreground">
            RAPID
          </span>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-sidebar-foreground transition-colors hover:bg-white/25"
        >
          {collapsed ? (
            <ChevronRight className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="size-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3 scrollbar-none"
        aria-label="Primary"
      >
        {primaryNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={item.href}
              end={item.href === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex shrink-0 flex-col items-center gap-1 rounded-lg border-2 border-transparent bg-white/10 py-2.5 text-[11px] font-medium text-sidebar-foreground/90 transition-colors hover:bg-white/15',
                  collapsed ? 'px-0' : 'px-2',
                  isActive && 'border-white bg-white/20 text-sidebar-foreground'
                )
              }
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="shrink-0 bg-sidebar-footer px-3 py-3">
        <div
          className={cn(
            'flex h-9 items-center gap-2 rounded-lg px-2 text-xs font-medium text-sidebar-foreground/90',
            collapsed && 'justify-center px-0'
          )}
        >
          <Moon className="size-4 shrink-0" aria-hidden="true" />
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
                  'relative h-5 w-9 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar-footer',
                  darkMode
                    ? 'border-transparent bg-white'
                    : 'border-white/30 bg-black/20'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 size-4 rounded-full shadow-sm transition-transform',
                    darkMode ? 'translate-x-4 bg-sidebar' : 'translate-x-0 bg-white'
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

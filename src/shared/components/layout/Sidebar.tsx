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
        collapsed ? 'w-21' : 'w-62'
      )}
    >
      <div className="flex h-21 shrink-0 items-center justify-between px-6">
        {!collapsed && (
          <span className="text-xl font-extrabold tracking-wide text-sidebar-foreground">
            RAPID
          </span>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-sidebar-foreground transition-colors hover:bg-white/25"
        >
          {collapsed ? (
            <ChevronRight className="size-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4" aria-label="Primary">
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
                  'flex shrink-0 flex-col items-center gap-2 rounded-2xl border-2 border-transparent bg-white/10 py-4 text-[13px] font-medium text-sidebar-foreground/90 transition-colors hover:bg-white/15',
                  collapsed ? 'px-0' : 'px-3',
                  isActive && 'border-white bg-white/20 text-sidebar-foreground'
                )
              }
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-white/15 px-4 py-4">
        <div
          className={cn(
            'flex h-12 items-center gap-3 rounded-xl px-4 text-[15px] font-medium text-sidebar-foreground/90',
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
                    darkMode ? 'translate-x-4.5 bg-sidebar' : 'translate-x-0.5 bg-white'
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

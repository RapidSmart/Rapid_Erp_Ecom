import { Bell, Globe, Heart, History, Maximize, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/utils'

export interface NavbarUser {
  name: string
  role: string
  avatarUrl?: string
}

export interface NavbarProps {
  searchPlaceholder?: string
  user: NavbarUser
  onSearch?: (value: string) => void
}

const actionIcons = [
  { id: 'fullscreen', icon: Maximize, label: 'Toggle fullscreen' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'favorites', icon: Heart, label: 'Favorites' },
  { id: 'history', icon: History, label: 'Recent activity' },
  { id: 'language', icon: Globe, label: 'Language' },
] as const

function Navbar({ searchPlaceholder = 'Search master data, users, documents...', user, onSearch }: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className="flex h-21 shrink-0 items-center gap-6 border-b border-border bg-background px-8"
    >
      <div className="flex h-11 w-full max-w-105 flex-1 items-center gap-2.5 rounded-xl border border-border bg-background px-3.5">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(event) => onSearch?.(event.target.value)}
          className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="shrink-0 rounded-md border border-border px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        {actionIcons.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon className="size-4.5" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className={cn(
          'flex shrink-0 items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 text-left transition-colors hover:bg-muted'
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-muted-foreground">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </span>
          )}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-foreground">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.role}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
    </header>
  )
}

export { Navbar }

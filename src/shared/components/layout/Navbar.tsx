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
      className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-6"
    >
      <div className="flex h-9 w-full max-w-80 flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
        <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(event) => onSearch?.(event.target.value)}
          className="h-full flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="shrink-0 rounded border border-border px-1 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {actionIcons.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className={cn(
          'flex shrink-0 items-center gap-2 rounded-lg py-1 pl-1 pr-1.5 text-left transition-colors hover:bg-muted'
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              width={32}
              height={32}
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-muted-foreground">
              {user.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </span>
          )}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-xs font-semibold text-foreground">{user.name}</span>
          <span className="text-[11px] text-muted-foreground">{user.role}</span>
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
    </header>
  )
}

export { Navbar }

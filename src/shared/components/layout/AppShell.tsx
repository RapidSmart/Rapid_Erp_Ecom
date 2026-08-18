import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar, type NavbarUser } from './Navbar'

export interface AppShellProps {
  user: NavbarUser
  children?: ReactNode
}

function AppShell({ user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((value) => !value)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar user={user} />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export { AppShell }

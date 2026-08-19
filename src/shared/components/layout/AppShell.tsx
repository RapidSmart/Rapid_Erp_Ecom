import { useMemo, useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar, type NavbarUser } from './Navbar'
import { SidebarContextProvider } from './sidebar-context'

export interface AppShellProps {
  user: NavbarUser
  children?: ReactNode
}

function AppShell({ user, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const sidebarContext = useMemo(
    () => ({
      collapsed,
      toggleCollapsed: () => setCollapsed((value) => !value),
    }),
    [collapsed]
  )

  return (
    <SidebarContextProvider value={sidebarContext}>
      <div className="flex h-svh w-full overflow-hidden bg-background">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={sidebarContext.toggleCollapsed}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((value) => !value)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar user={user} />
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarContextProvider>
  )
}

export { AppShell }

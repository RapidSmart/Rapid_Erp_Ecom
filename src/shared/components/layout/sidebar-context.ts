import { createContext, useContext } from 'react'

export interface SidebarContextValue {
  collapsed: boolean
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export const SidebarContextProvider = SidebarContext.Provider

/**
 * Read the shell sidebar state from any page rendered inside `AppShell`
 * (page-level menu buttons, breadcrumbs, responsive drawers).
 */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used inside <AppShell>')
  }

  return context
}

import { Outlet } from 'react-router-dom'
import { AppShell } from '@/shared/components/layout'

function App() {
  return (
    <AppShell user={{ name: 'Aarav Mehta', role: 'System administrator' }}>
      <Outlet />
    </AppShell>
  )
}

export default App

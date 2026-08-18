import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import App from '@/App'
import { SignIn, SignUp } from '@/modules/auth'
import { primaryNavItems } from '@/shared/components/layout'

const navRoutes = primaryNavItems
  .filter((item) => item.href !== '/')
  .map((item) => ({ path: item.href, element: <App /> }))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  ...navRoutes,
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: '/auth/signup',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
])

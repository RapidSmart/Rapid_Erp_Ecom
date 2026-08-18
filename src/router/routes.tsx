import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import App from '@/App'
import { SignIn, VerifyEmail } from '@/modules/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/signin',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: '/auth/verify-email',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    ),
  },
])

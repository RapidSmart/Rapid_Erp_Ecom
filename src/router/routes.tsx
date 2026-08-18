import { createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import App from '@/App'
import { SignIn, VerifyEmail, AccountVerified, ForgotPassword, CheckEmail, SetNewPassword } from '@/modules/auth'

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
  {
    path: '/auth/verified',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <AccountVerified />
      </Suspense>
    ),
  },
  {
    path: '/auth/forgot-password',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: '/auth/check-email',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <CheckEmail />
      </Suspense>
    ),
  },
  {
    path: '/auth/set-new-password',
    element: (
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SetNewPassword />
      </Suspense>
    ),
  },
])

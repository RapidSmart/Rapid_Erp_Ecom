import { lazy } from 'react'

export const SignIn = lazy(() => import('./view/SignIn'))
export const VerifyEmail = lazy(() => import('./view/VerifyEmail'))
export const AccountVerified = lazy(() => import('./view/AccountVerified'))
export const ForgotPassword = lazy(() => import('./view/ForgotPassword'))

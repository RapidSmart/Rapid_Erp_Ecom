import { SignInForm } from '../components/SignInForm'
import { AuthLayout } from '../components/AuthLayout'

export default function SignIn() {
  return (
    <AuthLayout>
      {/* Centered form container inside the right column */}
      <div className="w-full max-w-[460px] mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-[32px] font-bold tracking-tight text-gray-900 m-0">
            Sign in to Rapid
          </h2>
          <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
            Use your work email. Access follows the permissions set by your administrator.
          </p>
        </div>

        <SignInForm />
      </div>
    </AuthLayout>
  )
}

import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { SetNewPasswordForm } from '../components/SetNewPasswordForm'

export default function SetNewPassword() {
  return (
    <AuthLayout>
      {/* Centered container inside the right column */}
      <div className="w-full max-w-[460px] mx-auto space-y-6">
        
        {/* Top Back Button in document flow */}
        <div className="pb-2">
          <Link 
            to="/auth/signin" 
            className="inline-flex items-center justify-center h-9 px-3.5 rounded-full bg-[#E1E7F0] hover:bg-[#d1d8e2] text-sm font-semibold text-[#334155] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1 -ml-1" />
            Back
          </Link>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-[32px] font-bold tracking-tight text-gray-900 m-0">
            Set a new password
          </h2>
          <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
            Choose a strong password you don't use elsewhere.
          </p>
        </div>

        <SetNewPasswordForm />
      </div>
    </AuthLayout>
  )
}

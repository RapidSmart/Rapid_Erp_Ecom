import { Link } from 'react-router-dom'
import { Unlock, ChevronLeft } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { ForgotPasswordForm } from '../components/ForgotPasswordForm'

export default function ForgotPassword() {
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
            Back to sign in
          </Link>
        </div>

        <div className="space-y-4">
          <div className="w-[60px] h-[60px] bg-[#E8F6FE] rounded-[20px] flex items-center justify-center">
            <Unlock className="w-7 h-7 text-primary" strokeWidth={2} />
          </div>
          
          <div className="space-y-1.5">
            <h2 className="text-[32px] font-bold tracking-tight text-gray-900 m-0">
              Reset your password
            </h2>
            <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
              Enter the work email tied to your Rapid account and we'll send a secure reset link.
            </p>
          </div>
        </div>

        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  )
}

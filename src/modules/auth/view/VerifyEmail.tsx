import { Link } from 'react-router-dom'
import { Mail, ChevronLeft } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { VerifyEmailForm } from '../components/VerifyEmailForm'

export default function VerifyEmail() {
  const email = "a.mehta@rapid.co.nz"

  return (
    <AuthLayout>
      {/* Centered container inside the right column */}
      <div className="w-full max-w-[460px] mx-auto space-y-6">
        
        {/* Top Back Button in document flow */}
        <div className="pb-2">
          <Link 
            to="/auth/signin" 
            className="inline-flex items-center justify-center h-9 px-3.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-[#334155] hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1 -ml-1" />
            Back
          </Link>
        </div>

        <div className="space-y-4">
          <div className="w-[60px] h-[60px] bg-[#E8F6FE] rounded-[20px] flex items-center justify-center">
            <Mail className="w-7 h-7 text-primary" strokeWidth={2} />
          </div>
          
          <div className="space-y-1.5">
            <h2 className="text-[32px] font-bold tracking-tight text-gray-900 m-0">
              Verify your email
            </h2>
            <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
              Enter the verification code sent to your email to continue securely.
            </p>
          </div>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-full p-3.5 flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#E8F6FE] rounded-xl flex items-center justify-center shrink-0 border border-white">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-[15px] leading-tight">{email}</p>
            <p className="text-[#64748B] text-[13px] mt-0.5">6-digit code sent just now · valid for 10 minutes</p>
          </div>
        </div>

        <VerifyEmailForm />
      </div>
    </AuthLayout>
  )
}

import { Link } from 'react-router-dom'
import { Mail, ChevronLeft } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { VerifyEmailForm } from '../components/VerifyEmailForm'

export default function VerifyEmail() {
  const email = "a.mehta@rapid.co.nz"

  return (
    <AuthLayout>
      {/* Top Back Button */}
      <div className="absolute top-6 lg:top-8 left-6 lg:left-8">
        <Link 
          to="/auth/signin" 
          className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1 -ml-1" />
          Back
        </Link>
      </div>

      {/* Centered container inside the right column */}
      <div className="w-full max-w-[460px] mx-auto mt-16 lg:mt-0 space-y-6">
        <div className="space-y-4">
          <div className="w-14 h-14 bg-[#E8F6FE] rounded-2xl flex items-center justify-center">
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

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex items-center space-x-4">
          <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-[15px] leading-tight">{email}</p>
            <p className="text-gray-500 text-[13px] mt-0.5">6-digit code sent just now · valid for 10 minutes</p>
          </div>
        </div>

        <VerifyEmailForm />

        <div className="text-center pt-2">
          <Link 
            to="/auth/signin"
            className="text-gray-600 font-medium text-[15px] hover:text-gray-900 transition-colors"
          >
            Change email address
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

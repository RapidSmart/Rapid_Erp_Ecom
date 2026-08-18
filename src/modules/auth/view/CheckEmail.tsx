import { Link } from 'react-router-dom'
import { Mail, ChevronLeft, ArrowRight } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '@/shared/components/ui/button'

export default function CheckEmail() {
  const email = "a.mehta@rapid.co.nz"

  return (
    <AuthLayout>
      {/* Centered container inside the right column */}
      <div className="w-full max-w-[460px] mx-auto space-y-6">
        
        {/* Top Back Button in document flow */}
        <div className="pb-2">
          <Link 
            to="/auth/forgot-password" 
            className="inline-flex items-center justify-center h-9 px-3.5 rounded-full bg-[#E1E7F0] hover:bg-[#d1d8e2] text-sm font-semibold text-[#334155] transition-colors"
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
              Check your email
            </h2>
            <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
              We sent a reset link to your work address. Open it on this device to continue.
            </p>
          </div>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-full p-3.5 flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#E8F6FE] rounded-xl flex items-center justify-center shrink-0 border border-white">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-[15px] leading-tight">{email}</p>
            <p className="text-[#64748B] text-[13px] mt-0.5">Link valid for 30 minutes</p>
          </div>
        </div>

        <p className="text-[14px] text-gray-500 font-medium pb-2">
          Didn't get it? Check spam, or{' '}
          <span className="text-primary font-semibold cursor-pointer hover:underline underline-offset-4 transition-all">
            send again
          </span>.
        </p>

        <div className="w-full space-y-3">
          <Link to="/auth/set-new-password" className="w-full">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white h-[52px] rounded-full text-[15px] font-semibold transition-colors cursor-pointer"
            >
              I've opened the link
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>

          <Link 
            to="/auth/signin" 
            className="flex w-full items-center justify-center h-[52px] rounded-full border border-gray-200 bg-[#F8FAFC] hover:bg-gray-100 text-[15px] font-semibold text-gray-900 transition-colors cursor-pointer"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

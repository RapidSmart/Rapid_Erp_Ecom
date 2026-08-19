import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '@/shared/components/ui/button'

export default function AccountVerified() {
  return (
    <AuthLayout>
      {/* Centered container inside the right column */}
      <div className="w-full max-w-[400px] mx-auto text-center space-y-8 flex flex-col items-center">
        <div className="w-[60px] h-[60px] bg-[#E8F8F1] rounded-[20px] flex items-center justify-center">
          <Check className="w-7 h-7 text-[#10B981]" strokeWidth={2.5} />
        </div>
        
        <div className="space-y-2.5">
          <h2 className="text-[32px] font-bold tracking-tight text-gray-900 m-0">
            Account verified
          </h2>
          <p className="text-[#64748B] text-[15px] leading-relaxed m-0">
            Your email has been verified successfully. You can now continue to your account.
          </p>
        </div>

        <div className="w-full pt-4">
          <Link to="/">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white h-[52px] rounded-full text-[15px] font-semibold transition-colors cursor-pointer"
            >
              Continue
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

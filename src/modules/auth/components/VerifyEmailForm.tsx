import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/shared/components/ui/input-otp'
import { Button } from '@/shared/components/ui/button'

export function VerifyEmailForm() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('OTP submitted:', value)
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    navigate('/auth/verified')
  }

  const slotClassName = "w-12 h-12 sm:w-[60px] sm:h-[60px] text-xl sm:text-2xl font-bold bg-[#E1E7F0] !border !border-transparent !rounded-full cursor-pointer focus:ring-1 focus:ring-primary"

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-6">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(val) => setValue(val)}
        autoFocus
      >
        <InputOTPGroup className="gap-2 sm:gap-4">
          <InputOTPSlot index={0} className={slotClassName} />
          <InputOTPSlot index={1} className={slotClassName} />
          <InputOTPSlot index={2} className={slotClassName} />
        </InputOTPGroup>
        
        <InputOTPSeparator className="text-gray-300 px-1 sm:px-3" />
        
        <InputOTPGroup className="gap-2 sm:gap-4">
          <InputOTPSlot index={3} className={slotClassName} />
          <InputOTPSlot index={4} className={slotClassName} />
          <InputOTPSlot index={5} className={slotClassName} />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-[14px] text-gray-500 font-medium pb-2">
        Didn't receive it?{' '}
        <span className="text-primary font-semibold cursor-pointer hover:underline underline-offset-4 transition-all">
          Resend code
        </span>
      </p>

      <div className="w-full space-y-3">
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white h-[52px] rounded-full text-[15px] font-semibold transition-colors cursor-pointer"
          disabled={value.length < 6}
        >
          Verify email
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>

        <Link 
          to="/auth/signin" 
          className="flex w-full items-center justify-center h-[52px] rounded-full border border-gray-200 bg-[#F8FAFC] hover:bg-gray-100 text-[15px] font-semibold text-gray-900 transition-colors cursor-pointer"
        >
          Change email address
        </Link>
      </div>
    </form>
  )
}

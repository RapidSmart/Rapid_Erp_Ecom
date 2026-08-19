import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Mock API call
    console.log('Forgot password requested for:', email)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    navigate('/auth/check-email')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[14px] font-medium text-[#334155] cursor-pointer"
        >
          Work email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@rapid.co.nz"
            className="pl-10 h-12 rounded-full border-transparent bg-[#E1E7F0] text-gray-900 text-[14px] focus-visible:ring-1 focus-visible:ring-primary"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-primary hover:bg-primary/90 text-white h-[52px] rounded-full text-[15px] font-semibold transition-colors cursor-pointer"
        >
          Send reset link
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

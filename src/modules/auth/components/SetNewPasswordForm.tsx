import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export function SetNewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Mock API call
    console.log('Password reset submitted')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-[#334155] cursor-pointer">
            New password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pl-10 pr-10 h-12 rounded-full border-transparent bg-[#E1E7F0] text-gray-900 text-[14px] focus-visible:ring-1 focus-visible:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[14px] font-medium text-[#334155] cursor-pointer">
            Confirm new password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              className="pl-10 pr-10 h-12 rounded-full border-transparent bg-[#E1E7F0] text-gray-900 text-[14px] focus-visible:ring-1 focus-visible:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-1">
        <input
          id="keepSignedIn"
          type="checkbox"
          className="h-4 w-4 appearance-none rounded-sm border border-gray-300 bg-white checked:bg-primary checked:border-primary checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%208.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] bg-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 cursor-pointer"
        />
        <label
          htmlFor="keepSignedIn"
          className="text-[14px] font-medium text-[#64748B] cursor-pointer"
        >
          Keep me signed in on this device for 30 days.
        </label>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white h-[52px] rounded-full text-[15px] font-semibold transition-colors cursor-pointer"
        >
          Reset password & sign in
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

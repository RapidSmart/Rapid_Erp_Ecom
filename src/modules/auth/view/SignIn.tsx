import { SignInForm } from '../components/SignInForm'
import { FEATURE_BADGES, STATS } from '../constants/mock.auth'

export default function SignIn() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F7] font-sans p-4">
      {/* 
        Standard container width: max-w-5xl (1024px).
        Grid with 2 equal columns ensures both sections have the exact same width.
      */}
      <div className="w-full max-w-6xl overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Marketing Panel */}
        <div className="hidden lg:flex flex-col justify-between bg-primary p-12 lg:p-14 text-white">
          <div className="flex-1 flex flex-col max-w-md mx-auto">
            {/* Logo */}
            <div className="mb-14">
              <img src="/logo-white.png" alt="Rapid Logo" className="h-8 object-contain" />
            </div>

            <div className="space-y-4">
              <p className="text-[13px] font-medium text-white/90">
                Complete Business Management
              </p>
              <h1 className="text-[42px] font-bold leading-[1.2] text-white">
                Accounting & ERP<br />Software
              </h1>
              <p className="text-[13px] text-primary-foreground/90 max-w-[360px] leading-relaxed pt-1">
                All-in-one solution for accounting, inventory, POS, invoicing, payroll and more — built for Pakistani businesses
              </p>
            </div>

            <div className="mt-12">
              <p className="text-[10px] font-bold tracking-widest text-primary-foreground/90 uppercase mb-4">
                Everything you need in one place
              </p>
              <div className="flex flex-wrap gap-3 max-w-full">
                {FEATURE_BADGES.map((badge) => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={badge.id}
                      className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20"
                    >
                      <Icon className="h-3.5 w-3.5 text-white/95" />
                      <span className="text-[12px] font-medium text-white/95">{badge.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center pt-8 border-t border-white/20 mt-12 w-full max-w-md mx-auto">
            {STATS.map((stat, index) => (
              <div key={stat.id} className={`flex-1 ${index !== 0 ? 'border-l border-white/20 pl-8' : ''}`}>
                <p className="text-[28px] font-bold text-white leading-none">{stat.value}</p>
                <p className="text-[10px] font-bold tracking-widest text-primary-foreground/80 uppercase mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Auth Panel */}
        <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-14">
          {/* Centered form container inside the right column */}
          <div className="w-full max-w-[460px] mx-auto space-y-10">
            <div className="space-y-2">
              <h2 className="text-[28px] font-bold tracking-tight !text-gray-900 m-0">
                Sign in to Rapid
              </h2>
              <p className="!text-[#64748B] text-[13px] leading-relaxed m-0">
                Use your work email. Access follows the permissions set by your administrator.
              </p>
            </div>
            
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}

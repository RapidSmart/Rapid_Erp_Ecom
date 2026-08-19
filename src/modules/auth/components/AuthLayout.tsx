import { type ReactNode } from 'react'
import { FEATURE_BADGES, STATS } from '../constants/mock.auth'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F5F7] font-sans p-4">
      {/*
        Standard container width: max-w-7xl (1280px) for the large layout.
        Grid with 2 equal columns ensures both sections have the exact same width.
      */}
      <div className="w-full max-w-[1280px] min-h-[720px] lg:min-h-[760px] overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-2">
        {/* Left Marketing Panel */}
        <div className="hidden lg:flex flex-col bg-primary p-8 lg:p-10 xl:p-12 text-white overflow-hidden">
          <div className="w-full max-w-[540px] mx-auto flex flex-col h-full">
            {/* Logo */}
            <div className="shrink-0 pt-2">
              <img src="/logo-white.png" alt="Rapid Logo" className="h-8 object-contain" />
            </div>

            {/* Main Content Centered */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/90">
                  Complete Business Management
                </p>
                <h1 className="text-3xl xl:text-4xl tracking-tight font-bold leading-[1.1] text-white">
                  Accounting & ERP Software
                </h1>
                <p className="text-sm text-white/90 max-w-[440px] leading-relaxed pt-2">
                  All-in-one solution for accounting, inventory, POS, invoicing, payroll and more — built for Pakistani businesses
                </p>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-bold tracking-widest text-white/90 uppercase mb-4">
                  Everything you need in one place
                </p>
                <div className="flex flex-wrap gap-3 max-w-full">
                  {FEATURE_BADGES.map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div
                        key={badge.id}
                        className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
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
            <div className="shrink-0 flex items-center pt-10 pb-2 border-t border-white/20">
              {STATS.map((stat, index) => (
                <div key={stat.id} className={`flex-1 ${index !== 0 ? 'border-l border-white/20 pl-8' : ''}`}>
                  <p className="text-[28px] font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-[10px] font-bold tracking-widest text-white/80 uppercase mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Auth Panel */}
        <div className="flex flex-col justify-center p-8 lg:p-12 relative">
          {children}
        </div>
      </div>
    </div>
  )
}

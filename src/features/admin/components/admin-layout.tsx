import { type ReactNode } from 'react'
import {
  BadgeDollarSign,
  Briefcase,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProfileDropdown } from '@/components/profile-dropdown'

const navItems = [
  {
    label: 'Jobs',
    description: 'Manage all posted jobs',
    icon: Briefcase,
  },
  {
    label: 'Spotlight',
    description: 'Prioritize paid placements',
    icon: Star,
  },
  {
    label: 'Posting Requests',
    description: 'Approve or reject submissions',
    icon: BadgeDollarSign,
  },
  {
    label: 'Supporters',
    description: 'Celebrate platform backers',
    icon: Users,
  },
  {
    label: 'Experiments',
    description: 'Plan upcoming improvements',
    icon: Sparkles,
  },
] as const

type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='flex min-h-svh bg-muted/30'>
      <aside className='hidden w-72 flex-col border-r border-border/50 bg-white/90 px-6 py-8 shadow-sm lg:flex'>
        <div className='mb-8 space-y-1'>
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>
            Control Center
          </p>
          <h1 className='text-2xl font-semibold leading-tight'>
            ServiceNow Admin
          </h1>
        </div>

        <nav className='space-y-3'>
          {navItems.map((item) => (
            <button
              key={item.label}
              type='button'
              className='w-full rounded-xl border border-transparent bg-transparent p-3 text-left transition hover:border-border hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            >
              <div className='flex items-center gap-3'>
                <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary'>
                  <item.icon className='size-4' />
                </span>
                <div>
                  <p className='text-sm font-semibold'>{item.label}</p>
                  <p className='text-muted-foreground text-xs'>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        <div className='mt-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-4 shadow-inner'>
          <p className='text-sm font-semibold'>Need more tooling?</p>
          <p className='text-muted-foreground text-xs'>
            Future admin features (analytics, approvals) will live here.
          </p>
        </div>
      </aside>

      <div className='flex flex-1 flex-col'>
        <header className='flex flex-wrap items-center justify-between gap-4 border-b border-border/50 bg-white/80 px-6 py-4 shadow-sm'>
          <div>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>
              Admin Area
            </p>
            <h2 className='text-2xl font-semibold leading-tight'>
              Platform Overview
            </h2>
          </div>
          <div className='flex items-center gap-3'>
            <div className='hidden text-right text-sm sm:block'>
              <p className='font-medium'>You are in admin mode</p>
              <p className='text-muted-foreground text-xs'>
                Manage listings, spotlight & supporters
              </p>
            </div>
            <ProfileDropdown />
          </div>
        </header>
        <main className={cn('flex-1 px-6 py-8')}>{children}</main>
      </div>
    </div>
  )
}


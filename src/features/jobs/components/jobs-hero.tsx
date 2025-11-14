import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles, Users, BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function JobsHero() {
  return (
    <section className='relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white shadow-lg'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_#5FD14C20,_transparent_55%)]' />
      <div className='absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_65%)] blur-3xl opacity-60 pointer-events-none' />

      <div className='relative grid gap-12 p-8 sm:p-12'>
        <div className='space-y-8'>
          <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur'>
            <Sparkles className='h-4 w-4 text-[#5FD14C]' />
            Your ServiceNow growth hub
          </span>

          <div className='space-y-4'>
            <h1 className='text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl'>
              Discover the #1 destination for ServiceNow jobs and hiring teams
            </h1>
            <p className='text-balance text-base text-white/70 sm:text-lg'>
              Explore curated roles from ServiceNow-focused consultancies and enterprise platforms. Whether you&apos;re scaling a platform team or launching your ServiceNow career, we make the next step effortless.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button size='lg' asChild className='h-12 px-6 text-base font-semibold'>
              <Link to='/'>Browse roles</Link>
            </Button>
            <Button
              size='lg'
              variant='secondary'
              asChild
              className='h-12 px-6 text-base font-semibold bg-white text-black hover:bg-white/90'
            >
              <Link to='/jobs/post' className='flex items-center gap-2'>
                Post a job
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>

          <dl className='grid gap-4 text-sm text-white/70 sm:grid-cols-3'>
            <div className='rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60'>
                <Users className='h-4 w-4 text-[#5FD14C]' />
                Talent reach
              </dt>
              <dd className='mt-2 text-lg font-semibold text-white'>15k+ professionals</dd>
            </div>
            <div className='rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60'>
                <BriefcaseBusiness className='h-4 w-4 text-[#5FD14C]' />
                Active roles
              </dt>
              <dd className='mt-2 text-lg font-semibold text-white'>250+ listings</dd>
            </div>
            <div className='rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60'>
                <ArrowRight className='h-4 w-4 text-[#5FD14C]' />
                Success rate
              </dt>
              <dd className='mt-2 text-lg font-semibold text-white'>4x faster matches</dd>
            </div>
          </dl>
        </div>

      </div>
    </section>
  )
}

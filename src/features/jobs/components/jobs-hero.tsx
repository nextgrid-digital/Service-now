import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles, Users, BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function JobsHero() {
  return (
    <section className='relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl group'>
      {/* Animated gradient overlays */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500' />
      <div className='absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/10 via-transparent to-transparent blur-3xl opacity-60 pointer-events-none' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_oklch(0.65_0.22_250_/_0.15),_transparent_50%)] pointer-events-none' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_oklch(0.65_0.18_180_/_0.15),_transparent_50%)] pointer-events-none' />

      <div className='relative grid gap-12 p-8 sm:p-12 lg:p-16'>
        <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <span className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:text-primary/90 backdrop-blur-md shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200'>
            <Sparkles className='h-4 w-4 text-primary' />
            Your ServiceNow growth hub
          </span>

          <div className='space-y-4'>
            <h1 className='text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl text-foreground'>
              Discover the #1 destination for ServiceNow jobs and hiring teams
            </h1>
            <p className='text-balance text-base text-muted-foreground sm:text-lg lg:text-xl max-w-2xl leading-relaxed'>
              Explore curated roles from ServiceNow-focused consultancies and enterprise platforms. Whether you&apos;re scaling a platform team or launching your ServiceNow career, we make the next step effortless.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button size='lg' asChild className='h-12 px-8 text-base font-semibold shadow-lg'>
              <Link to='/'>Browse roles</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              asChild
              className='h-12 px-8 text-base font-semibold border-2'
            >
              <Link to='/jobs/post' className='flex items-center gap-2'>
                Post a job
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </div>

          <dl className='grid gap-4 text-sm sm:grid-cols-3'>
            <div className='rounded-2xl border border-border/50 bg-card/50 dark:bg-card/30 backdrop-blur-md p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group/card'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <Users className='h-4 w-4 text-primary group-hover/card:text-accent transition-colors duration-200' />
                Talent reach
              </dt>
              <dd className='text-2xl font-bold text-foreground'>15k+ professionals</dd>
            </div>
            <div className='rounded-2xl border border-border/50 bg-card/50 dark:bg-card/30 backdrop-blur-md p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group/card'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <BriefcaseBusiness className='h-4 w-4 text-primary group-hover/card:text-accent transition-colors duration-200' />
                Active roles
              </dt>
              <dd className='text-2xl font-bold text-foreground'>250+ listings</dd>
            </div>
            <div className='rounded-2xl border border-border/50 bg-card/50 dark:bg-card/30 backdrop-blur-md p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group/card'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <ArrowRight className='h-4 w-4 text-primary group-hover/card:text-accent transition-colors duration-200' />
                Success rate
              </dt>
              <dd className='text-2xl font-bold text-foreground'>4x faster matches</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

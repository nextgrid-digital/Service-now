import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles, Users, BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function JobsHero() {
  return (
    <section className='relative overflow-hidden rounded-3xl'>
      <div className='grid gap-12 p-8 sm:p-12 lg:p-16'>
        <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <span className='inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary dark:text-primary/90 backdrop-blur-md'>
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
            <Button size='lg' asChild className='h-12 px-8 text-base font-semibold'>
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
            <div className='rounded-2xl border border-border/50 bg-transparent p-5'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <Users className='h-4 w-4 text-primary' />
                Talent reach
              </dt>
              <dd className='text-2xl font-bold text-foreground'>15k+ professionals</dd>
            </div>
            <div className='rounded-2xl border border-border/50 bg-transparent p-5'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <BriefcaseBusiness className='h-4 w-4 text-primary' />
                Active roles
              </dt>
              <dd className='text-2xl font-bold text-foreground'>250+ listings</dd>
            </div>
            <div className='rounded-2xl border border-border/50 bg-transparent p-5'>
              <dt className='flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'>
                <ArrowRight className='h-4 w-4 text-primary' />
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

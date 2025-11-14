import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const spotlightCards = [
  {
    id: 'spotlight-1',
    title: 'Senior ServiceNow Developer',
    meta: 'Full-time • Remote',
    description:
      'ServiceNow Solutions Inc. seeks a Senior ServiceNow Developer for a remote role. Build custom applications, integrations, and automations using Flow Designer. Work on ITSM, ITOM, and HRSD modules. $120,000 - $180,000 for experienced developers.',
    company: 'ServiceNow Solutions Inc.',
    companyTag: 'Enterprise',
    avatar: 'SN',
    jobId: 'job-3',
    className:
      'bg-[#DFFECD] text-gray-900 shadow-lg hover:shadow-xl transition-shadow',
    buttonClassName:
      'bg-white text-gray-900 hover:bg-white/90 transition-colors',
  },
  {
    id: 'spotlight-2',
    title: 'ServiceNow Solution Architect',
    meta: 'Full-time • Hybrid',
    description:
      'CloudTech Services: Lead our ServiceNow Center of Excellence. Design scalable ServiceNow solutions, mentor development teams, and drive platform innovation across enterprise clients. Shape the future of our ServiceNow practice.',
    company: 'CloudTech Services',
    companyTag: 'Consulting',
    avatar: 'CT',
    jobId: 'job-7',
    className:
      'bg-slate-900 text-white shadow-lg hover:shadow-xl transition-shadow',
    buttonClassName:
      'bg-white text-slate-900 hover:bg-white/90 transition-colors',
  },
  {
    id: 'spotlight-cta',
    title: 'Spotlight your job here',
    meta: '1 week, 4x more views, 100 guaranteed application clicks.',
    description:
      'Reach thousands of qualified ServiceNow professionals. Feature your role in the spotlight and boost your hiring pipeline.',
    className:
      'border-2 border-dashed border-muted-foreground/30 bg-muted/40 text-muted-foreground hover:border-muted-foreground/50 transition-colors',
    cta: true,
  },
]

export function JobsSpotlight() {
  return (
    <section className='space-y-4 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h2 className='text-xl font-semibold sm:text-2xl'>In the spotlight</h2>
          <p className='text-muted-foreground text-sm sm:text-base'>
            Hand-picked roles from top teams. Discover what’s trending right now.
          </p>
        </div>
        <Button asChild variant='link' className='px-0'>
          <Link to='/jobs/post' className='gap-1'>
            Add a job
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {spotlightCards.map((card) => {
          if (card.cta) {
            return (
              <Card
                key={card.id}
                className={`flex flex-col justify-between p-6 ${card.className}`}
              >
                <CardContent className='flex h-full flex-col justify-between gap-4 p-0 text-sm leading-relaxed'>
                  <div className='space-y-3'>
                    <p className='text-lg font-semibold text-foreground'>
                      {card.title}
                    </p>
                    <p>{card.description}</p>
                  </div>
                  <div className='space-y-2'>
                    <p className='font-medium text-foreground'>Why spotlight?</p>
                    <p>{card.meta}</p>
                    <Button
                      asChild
                      variant='outline'
                      className='gap-2 border-primary/40 text-primary hover:border-primary/60'
                    >
                      <Link to='/jobs/post'>
                        Spotlight your job
                        <ArrowUpRight className='h-4 w-4' />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          }

          const buttonClassName = card.buttonClassName ?? ''

          return (
            <Card
              key={card.id}
              className={`border-0 ${card.className}`}
            >
              <CardContent className='flex h-full flex-col justify-between gap-6 p-6'>
                <div className='space-y-3'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-semibold sm:text-xl'>
                      {card.title}
                    </h3>
                    <p className='text-sm opacity-90'>{card.meta}</p>
                  </div>
                  <p className='text-sm opacity-90'>
                    {card.description}
                  </p>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 border border-white/40 bg-white/15'>
                      <AvatarFallback className='text-xs font-semibold'>
                        {card.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-semibold'>{card.company}</p>
                      <p className='text-xs opacity-80'>{card.companyTag}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant='secondary'
                    className={`rounded-full px-6 ${buttonClassName}`}
                  >
                    <Link to='/jobs/$jobId' params={{ jobId: card.jobId! }}>
                      Apply
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}


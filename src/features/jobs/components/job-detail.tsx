import { useEffect } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { MapPin, DollarSign, Briefcase, Calendar, Building2, Clock, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useJobsStore } from '@/stores/jobs-store'
import { useApplicationsStore } from '@/stores/applications-store'
import { useAuthStore } from '@/stores/auth-store'
import { ApplyButton } from './apply-button'
import { format, formatDistanceToNow } from 'date-fns'
import { Route } from '@/routes/_authenticated/jobs/$jobId'

export function JobDetail() {
  const navigate = useNavigate()
  const { jobId } = Route.useParams()
  const { getJob } = useJobsStore()
  const { hasApplied } = useApplicationsStore()
  const { auth } = useAuthStore()
  const userId = auth.user?.userId

  const job = getJob(jobId)
  const applied = userId ? hasApplied(jobId, userId) : false

  useEffect(() => {
    if (!job) {
      navigate({ to: '/' })
    }
  }, [job, navigate])

  if (!job) {
    return null
  }

  const timeAgo = formatDistanceToNow(job.createdAt, { addSuffix: true })
  const postedOn = format(job.createdAt, 'MMMM d, yyyy')

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <nav className='text-sm text-muted-foreground'>
          <ol className='flex items-center gap-1 sm:gap-2'>
            <li>
              <Link
                to='/'
                className='hover:text-primary transition-colors'
              >
                Jobs
              </Link>
            </li>
            <li aria-hidden='true'>
              <ChevronRight className='h-4 w-4' />
            </li>
            <li className='text-foreground font-medium truncate max-w-[220px] sm:max-w-xs lg:max-w-sm'>
              {job.title}
            </li>
          </ol>
        </nav>

        <div className='grid gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Card className='border-0'>
              <CardHeader>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <CardTitle className='text-2xl sm:text-3xl mb-2'>
                        {job.title}
                      </CardTitle>
                      <div className='flex items-center gap-2 text-lg text-muted-foreground'>
                        <Building2 className='h-5 w-5' />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    {applied && (
                      <Badge variant='secondary' className='text-sm'>
                        Applied
                      </Badge>
                    )}
                  </div>

                  <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                    {job.location && (
                      <div className='flex items-center gap-1.5'>
                        <MapPin className='h-4 w-4' />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.salary && (
                      <div className='flex items-center gap-1.5'>
                        <DollarSign className='h-4 w-4' />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    <div className='flex items-center gap-1.5'>
                      <Briefcase className='h-4 w-4' />
                      <span className='capitalize'>{job.type.replace('-', ' ')}</span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <Clock className='h-4 w-4' />
                      <span>Posted {timeAgo}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-6'>
                {job.overview && (
                  <section className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Job Overview</h3>
                    <p className='text-muted-foreground whitespace-pre-line leading-relaxed'>
                      {job.overview}
                    </p>
                  </section>
                )}

                {job.description && (
                  <section className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Job Description</h3>
                    <p className='text-muted-foreground whitespace-pre-line leading-relaxed'>
                      {job.description}
                    </p>
                  </section>
                )}

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <section className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Responsibilities</h3>
                    <ul className='space-y-2 text-muted-foreground leading-relaxed list-inside list-disc'>
                      {job.responsibilities.map((item, index) => (
                        <li key={`resp-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <section className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Job Requirements</h3>
                    <ul className='space-y-2 text-muted-foreground leading-relaxed list-inside list-disc'>
                      {job.requirements.map((item, index) => (
                        <li key={`req-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <section className='space-y-3'>
                    <h3 className='text-lg font-semibold'>Benefits & Perks</h3>
                    <ul className='space-y-2 text-muted-foreground leading-relaxed list-inside list-disc'>
                      {job.benefits.map((item, index) => (
                        <li key={`benefit-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </CardContent>
            </Card>
          </div>

          <div className='lg:col-span-1'>
            <Card className='sticky top-20'>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Company</span>
                    <span className='font-medium'>{job.company}</span>
                  </div>
                  {job.location && (
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Location</span>
                      <span className='font-medium'>{job.location}</span>
                    </div>
                  )}
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Type</span>
                    <span className='font-medium capitalize'>{job.type.replace('-', ' ')}</span>
                  </div>
                  {job.salary && (
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Salary</span>
                      <span className='font-medium'>{job.salary}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <ApplyButton jobId={job.id} applied={applied} className='w-full' />
                <div className='space-y-1 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-3 w-3' />
                    <span>Posted {timeAgo}</span>
                  </div>
                  <p>Posted on {postedOn}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}


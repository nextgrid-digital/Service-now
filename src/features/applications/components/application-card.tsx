import { Link } from '@tanstack/react-router'
import { Calendar, MapPin, Building2, DollarSign, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ApplicationStatusBadge } from '@/components/application-status-badge'
import { formatDistanceToNow } from 'date-fns'
import type { Application } from '@/types/application'
import type { Job } from '@/types/job'

interface ApplicationCardProps {
  application: Application
  job: Job | undefined
}

export function ApplicationCard({ application, job }: ApplicationCardProps) {
  if (!job) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <p className='text-muted-foreground'>Job not found</p>
        </CardContent>
      </Card>
    )
  }

  const timeAgo = formatDistanceToNow(application.appliedAt, { addSuffix: true })

  return (
    <Card className='transition-shadow hover:shadow-md'>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1 min-w-0'>
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <h3 className='text-lg font-semibold leading-tight'>{job.title}</h3>
              <ApplicationStatusBadge status={application.status} />
            </div>
            <div className='text-muted-foreground flex flex-wrap items-center gap-3 text-sm'>
              <div className='flex items-center gap-1'>
                <Building2 className='h-4 w-4 shrink-0' />
                <span className='truncate'>{job.company}</span>
              </div>
              {job.location && (
                <div className='flex items-center gap-1'>
                  <MapPin className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{job.location}</span>
                </div>
              )}
              <div className='flex items-center gap-1'>
                <Briefcase className='h-4 w-4 shrink-0' />
                <span className='capitalize'>{job.type.replace('-', ' ')}</span>
              </div>
              {job.salary && (
                <div className='flex items-center gap-1'>
                  <DollarSign className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{job.salary}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4 shrink-0' />
            <span>Applied {timeAgo}</span>
          </div>
          <Button variant='outline' size='sm' asChild className='w-full sm:w-auto'>
            <Link to='/jobs/$jobId' params={{ jobId: job.id }}>
              View Job Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


import { Link } from '@tanstack/react-router'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplicationCard } from './application-card'
import type { Application } from '@/types/application'
import type { Job } from '@/types/job'

interface ApplicationWithJob {
  application: Application
  job: Job | undefined
}

interface ApplicationsListProps {
  applications: ApplicationWithJob[]
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
  if (applications.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='rounded-full bg-muted p-6 mb-4'>
          <Briefcase className='h-12 w-12 text-muted-foreground' />
        </div>
        <h3 className='text-xl font-semibold mb-2'>No applications yet</h3>
        <p className='text-muted-foreground mb-6 max-w-md'>
          Start applying to ServiceNow jobs to track your applications here. Browse available positions and submit your applications.
        </p>
        <Button asChild>
          <Link to='/'>
            Browse Jobs
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {applications.map(({ application, job }) => (
        <ApplicationCard key={application.id} application={application} job={job} />
      ))}
    </div>
  )
}


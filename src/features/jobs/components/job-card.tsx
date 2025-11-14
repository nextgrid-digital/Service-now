import { useNavigate } from '@tanstack/react-router'
import { MapPin, DollarSign, Briefcase, Calendar } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ApplyButton } from './apply-button'
import type { Job } from '@/types/job'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

interface JobCardProps {
  job: Job
  applied?: boolean
}

export function JobCard({ job, applied = false }: JobCardProps) {
  const timeAgo = formatDistanceToNow(job.createdAt, { addSuffix: true })
  const navigate = useNavigate()

  return (
    <Card
      className={cn(
        'flex flex-col cursor-pointer group relative overflow-hidden',
        'hover:scale-[1.02] active:scale-[0.99]',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5',
        'before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        applied && 'opacity-75'
      )}
      role='button'
      tabIndex={0}
      onClick={() =>
        navigate({
          to: '/jobs/$jobId',
          params: { jobId: job.id },
        })
      }
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate({
            to: '/jobs/$jobId',
            params: { jobId: job.id },
          })
        }
      }}
    >
      <CardHeader className='relative z-10'>
        <div className='flex items-start justify-between gap-2'>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200'>
              {job.title}
            </h3>
            <p className='text-muted-foreground mt-1.5 text-sm font-medium'>{job.company}</p>
          </div>
          {applied && (
            <Badge variant='secondary' className='shrink-0'>
              Applied
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex-1 space-y-3 relative z-10'>
        <div className='flex flex-wrap gap-2.5 text-sm text-muted-foreground'>
          {job.location && (
            <div className='flex items-center gap-1'>
              <MapPin className='h-4 w-4' />
              <span>{job.location}</span>
            </div>
          )}
          {job.salary && (
            <div className='flex items-center gap-1'>
              <DollarSign className='h-4 w-4' />
              <span>{job.salary}</span>
            </div>
          )}
          <div className='flex items-center gap-1'>
            <Briefcase className='h-4 w-4' />
            <span className='capitalize'>{job.type.replace('-', ' ')}</span>
          </div>
        </div>
        <p className='text-muted-foreground line-clamp-3 text-sm whitespace-pre-line'>
          {job.overview || job.description}
        </p>
        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          <Calendar className='h-3 w-3' />
          <span>Posted {timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <ApplyButton jobId={job.id} applied={applied} className='w-full' />
      </CardFooter>
    </Card>
  )
}


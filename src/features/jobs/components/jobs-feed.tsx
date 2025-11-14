import { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { MapPin, DollarSign, Briefcase, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ApplyButton } from './apply-button'
import { useJobsStore } from '@/stores/jobs-store'
import { useApplicationsStore } from '@/stores/applications-store'
import { useAuthStore } from '@/stores/auth-store'
import type { Job } from '@/types/job'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import type { SortOption } from './jobs-filter'

interface JobsFeedProps {
  searchQuery?: string
  locationFilter?: string
  typeFilter?: string
  sortBy?: SortOption
}

export function JobsFeed({
  searchQuery = '',
  locationFilter = '',
  typeFilter = '',
  sortBy = 'date-desc',
}: JobsFeedProps) {
  const { jobs } = useJobsStore()
  const { hasApplied } = useApplicationsStore()
  const { auth } = useAuthStore()
  const userId = auth.user?.userId

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = [...jobs]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
      )
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(
        (job) =>
          job.location?.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    // Sort jobs
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'date-asc':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'company-asc':
          return a.company.localeCompare(b.company)
        case 'company-desc':
          return b.company.localeCompare(a.company)
        case 'salary-desc': {
          const aSalary = extractSalaryValue(a.salary)
          const bSalary = extractSalaryValue(b.salary)
          if (aSalary === null && bSalary === null) return 0
          if (aSalary === null) return 1
          if (bSalary === null) return -1
          return bSalary - aSalary
        }
        case 'salary-asc': {
          const aSalary = extractSalaryValue(a.salary)
          const bSalary = extractSalaryValue(b.salary)
          if (aSalary === null && bSalary === null) return 0
          if (aSalary === null) return 1
          if (bSalary === null) return -1
          return aSalary - bSalary
        }
        default:
          return 0
      }
    })

    return sorted
  }, [jobs, searchQuery, locationFilter, typeFilter, sortBy])

  if (filteredAndSortedJobs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center'>
        <p className='text-muted-foreground text-lg'>No jobs found</p>
        <p className='text-muted-foreground mt-2 text-sm'>
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-3 sm:space-y-4'>
      {filteredAndSortedJobs.map((job) => {
        const applied = userId ? hasApplied(job.id, userId) : false
        return (
          <JobPost key={job.id} job={job} applied={applied} />
        )
      })}
    </div>
  )
}

// Helper function to extract numeric value from salary string
function extractSalaryValue(salary: string | undefined): number | null {
  if (!salary) return null
  
  // Remove currency symbols and commas, extract numbers
  const match = salary.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/)
  if (!match) return null
  
  // Remove commas and parse
  const value = parseFloat(match[1].replace(/,/g, ''))
  return isNaN(value) ? null : value
}

interface JobPostProps {
  job: Job
  applied?: boolean
}

function JobPost({ job, applied = false }: JobPostProps) {
  const timeAgo = formatDistanceToNow(job.createdAt, { addSuffix: true })
  const companyInitials = job.company
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  const navigate = useNavigate()

  return (
    <Card
      className={cn(
        'transition-shadow hover:shadow-md cursor-pointer',
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
      <CardContent className='p-3 sm:p-4'>
        <div className='flex gap-2 sm:gap-3'>
          {/* Avatar */}
          <Avatar className='h-10 w-10 shrink-0 sm:h-12 sm:w-12'>
            <AvatarFallback className='bg-primary/10 text-primary text-xs font-semibold sm:text-sm'>
              {companyInitials}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-1.5 sm:gap-2 flex-wrap'>
                  <h3 className='font-semibold text-sm sm:text-base leading-tight'>
                    {job.company}
                  </h3>
                  <span className='text-muted-foreground text-xs sm:text-sm hidden sm:inline'>·</span>
                  <span className='text-muted-foreground text-xs sm:text-sm'>
                    {timeAgo}
                  </span>
                  {applied && (
                    <>
                      <span className='text-muted-foreground text-xs sm:text-sm hidden sm:inline'>·</span>
                      <Badge variant='secondary' className='text-xs'>
                        Applied
                      </Badge>
                    </>
                  )}
                </div>
                <h4 className='font-semibold text-base sm:text-lg mt-1 leading-tight hover:text-primary transition-colors'>
                  {job.title}
                </h4>
              </div>
            </div>

            <p className='text-muted-foreground mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none whitespace-pre-line'>
              {job.overview || job.description}
            </p>

            {/* Job Details */}
            <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-muted-foreground'>
              {job.location && (
                <div className='flex items-center gap-1 sm:gap-1.5'>
                  <MapPin className='h-3 w-3 sm:h-4 sm:w-4 shrink-0' />
                  <span className='truncate max-w-[150px] sm:max-w-none'>{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className='flex items-center gap-1 sm:gap-1.5'>
                  <DollarSign className='h-3 w-3 sm:h-4 sm:w-4 shrink-0' />
                  <span className='truncate max-w-[120px] sm:max-w-none'>{job.salary}</span>
                </div>
              )}
              <div className='flex items-center gap-1 sm:gap-1.5'>
                <Briefcase className='h-3 w-3 sm:h-4 sm:w-4 shrink-0' />
                <span className='capitalize'>{job.type.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-4 pt-3 border-t'
              onClick={(event) => event.stopPropagation()}
            >
              <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                <Calendar className='h-3 w-3' />
                <span>Posted {timeAgo}</span>
              </div>
              <ApplyButton jobId={job.id} applied={applied} className='w-full sm:w-auto' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


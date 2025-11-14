import { useMemo } from 'react'
import { useJobsStore } from '@/stores/jobs-store'
import { useApplicationsStore } from '@/stores/applications-store'
import { useAuthStore } from '@/stores/auth-store'
import { JobCard } from './job-card'
import { cn } from '@/lib/utils'
import type { SortOption } from './jobs-filter'

interface JobsGridProps {
  searchQuery?: string
  locationFilter?: string
  typeFilter?: string
  sortBy?: SortOption
}

export function JobsGrid({
  searchQuery = '',
  locationFilter = '',
  typeFilter = '',
  sortBy = 'date-desc',
}: JobsGridProps) {
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
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        'auto-rows-fr'
      )}
    >
      {filteredAndSortedJobs.map((job) => {
        const applied = userId ? hasApplied(job.id, userId) : false
        return <JobCard key={job.id} job={job} applied={applied} />
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


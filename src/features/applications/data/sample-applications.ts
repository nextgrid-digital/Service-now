import { faker } from '@faker-js/faker'
import type { Application, ApplicationStatus } from '@/types/application'
import { sampleJobs } from '@/features/jobs/data/jobs'

faker.seed(12345)

const statuses: ApplicationStatus[] = [
  'pending',
  'reviewing',
  'shortlisted',
  'rejected',
  'accepted',
]

// Use the first job seeker user ID from sample users
const DEFAULT_USER_ID = 'user-1'

export function generateSampleApplications(
  userId: string = DEFAULT_USER_ID,
  count: number = 8
): Application[] {
  const applications: Application[] = []
  
  // Get a subset of jobs to apply to
  const jobsToApplyTo = faker.helpers.arrayElements(sampleJobs, count)

  for (let i = 0; i < count; i++) {
    const job = jobsToApplyTo[i]
    const status = faker.helpers.arrayElement(statuses)
    const appliedAt = faker.date.past({ years: 0.5, refDate: new Date() })
    
    // Some applications might have been updated
    const updatedAt = status !== 'pending' && faker.datatype.boolean()
      ? faker.date.between({ from: appliedAt, to: new Date() })
      : undefined

    applications.push({
      id: `app-${i + 1}`,
      jobId: job.id,
      userId,
      status,
      appliedAt,
      updatedAt,
    })
  }

  // Sort by appliedAt date (newest first)
  return applications.sort((a, b) => b.appliedAt.getTime() - a.appliedAt.getTime())
}

// Generate initial sample applications for default user
export const sampleApplications = generateSampleApplications(DEFAULT_USER_ID, 8)


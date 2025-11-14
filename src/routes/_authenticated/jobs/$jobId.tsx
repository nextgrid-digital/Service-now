import { createFileRoute } from '@tanstack/react-router'
import { JobDetail } from '@/features/jobs/components/job-detail'

export const Route = createFileRoute('/_authenticated/jobs/$jobId')({
  component: JobDetail,
})





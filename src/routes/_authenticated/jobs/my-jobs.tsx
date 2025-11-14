import { createFileRoute } from '@tanstack/react-router'
import { MyJobs } from '@/features/jobs/components/my-jobs'

export const Route = createFileRoute('/_authenticated/jobs/my-jobs')({
  component: MyJobs,
})


import { createFileRoute } from '@tanstack/react-router'
import { PostJob } from '@/features/jobs/components/post-job'

export const Route = createFileRoute('/_authenticated/jobs/post')({
  component: PostJob,
})


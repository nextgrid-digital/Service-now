import { createFileRoute } from '@tanstack/react-router'
import { JobsListing } from '@/features/jobs'

export const Route = createFileRoute('/_authenticated/')({
  component: JobsListing,
})

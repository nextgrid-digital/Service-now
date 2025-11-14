import { z } from 'zod'

export const applicationStatusSchema = z.enum([
  'pending',
  'reviewing',
  'shortlisted',
  'rejected',
  'accepted',
])

export type ApplicationStatus = z.infer<typeof applicationStatusSchema>

export const applicationSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  userId: z.string(),
  status: applicationStatusSchema.default('pending'),
  appliedAt: z.date(),
  updatedAt: z.date().optional(),
})

export type Application = z.infer<typeof applicationSchema>


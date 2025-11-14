import { z } from 'zod'

export const userTypeSchema = z.enum(['job_seeker', 'company', 'admin'])

export type UserType = z.infer<typeof userTypeSchema>

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  userType: userTypeSchema,
  createdAt: z.date(),
})

export type User = z.infer<typeof userSchema>


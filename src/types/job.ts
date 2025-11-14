import { z } from 'zod'

export const jobTypeSchema = z.enum([
  'full-time',
  'part-time',
  'contract',
  'freelance',
  'internship',
])

export type JobType = z.infer<typeof jobTypeSchema>

export const jobSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  salary: z.string().optional(),
  type: jobTypeSchema,
  description: z.string().min(1, 'Job description is required'),
  overview: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  postedBy: z.string(), // userId of the company/admin who posted
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export type Job = z.infer<typeof jobSchema>

export const createJobSchema = jobSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateJobInput = z.infer<typeof createJobSchema>


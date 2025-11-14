import { z } from 'zod'

// Work Experience
export const workExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  location: z.string().optional(),
})

export type WorkExperience = z.infer<typeof workExperienceSchema>

// Education
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

export type Education = z.infer<typeof educationSchema>

// Project
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  collaborators: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
})

export type Project = z.infer<typeof projectSchema>

// Certification
export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
})

export type Certification = z.infer<typeof certificationSchema>

// Volunteering
export const volunteeringSchema = z.object({
  id: z.string(),
  organization: z.string().min(1, 'Organization name is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

export type Volunteering = z.infer<typeof volunteeringSchema>

// Award
export const awardSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Award title is required'),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
})

export type Award = z.infer<typeof awardSchema>

// Speaking Engagement
export const speakingSchema = z.object({
  id: z.string(),
  event: z.string().min(1, 'Event name is required'),
  topic: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
})

export type Speaking = z.infer<typeof speakingSchema>

// Contact/Social Links
export const contactSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
})

export type Contact = z.infer<typeof contactSchema>

// Complete Profile
export const profileSchema = z.object({
  userId: z.string(),
  summary: z.string().optional(),
  workExperience: z.array(workExperienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  volunteering: z.array(volunteeringSchema).default([]),
  awards: z.array(awardSchema).default([]),
  speaking: z.array(speakingSchema).default([]),
  contact: contactSchema.optional(),
  updatedAt: z.date().optional(),
})

export type Profile = z.infer<typeof profileSchema>


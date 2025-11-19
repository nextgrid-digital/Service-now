import type { Job, CreateJobInput } from '@/types/job'
import { sampleJobs } from '@/features/jobs/data/jobs'

const API_BASE_URL = import.meta.env.VITE_DATA_API_URL

export type SpotlightJob = {
  jobId: string
  priority: number
  paid: boolean
}

export type PostingRequest = {
  id: string
  company: string
  jobTitle: string
  amountPaid: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export type SupporterRecord = {
  userId: string
  name?: string
  email?: string
  amount?: number
  supportedAt?: string
  isSupporter: boolean
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T | null> {
  if (!API_BASE_URL) return null

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('[API]', error)
    return null
  }
}

const hydrateJob = (job: Job): Job => ({
  ...job,
  createdAt: new Date(job.createdAt),
  updatedAt: job.updatedAt ? new Date(job.updatedAt) : undefined,
})

export async function fetchJobsFromDataSource(): Promise<Job[]> {
  const apiJobs = await apiRequest<Job[]>('/jobs')
  if (apiJobs?.length) {
    return apiJobs.map(hydrateJob)
  }
  return sampleJobs
}

export async function createJobRecord(
  payload: CreateJobInput
): Promise<Job | null> {
  const created = await apiRequest<Job>('/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (created) {
    return hydrateJob(created)
  }
  return null
}

export async function updateJobRecord(
  id: string,
  updates: Partial<Job>
): Promise<Job | null> {
  const updated = await apiRequest<Job>(`/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
  if (updated) {
    return hydrateJob(updated)
  }
  return null
}

export async function deleteJobRecord(id: string): Promise<boolean> {
  const response = await apiRequest<{ success: boolean }>(`/jobs/${id}`, {
    method: 'DELETE',
  })
  return response?.success ?? false
}

export async function fetchSpotlightJobs(): Promise<SpotlightJob[]> {
  const data = await apiRequest<SpotlightJob[]>('/spotlight')
  return data ?? []
}

export async function fetchPostingRequests(): Promise<PostingRequest[]> {
  const data = await apiRequest<PostingRequest[]>('/posting-requests')
  return data ?? []
}

export async function fetchSupporters(): Promise<SupporterRecord[]> {
  const data = await apiRequest<SupporterRecord[]>('/supporters')
  return data ?? []
}

export async function upsertSupporter(
  supporter: SupporterRecord
): Promise<SupporterRecord | null> {
  const result = await apiRequest<SupporterRecord>('/supporters', {
    method: 'POST',
    body: JSON.stringify(supporter),
  })
  return result ?? null
}

export async function removeSupporterRecord(
  userId: string
): Promise<boolean> {
  const response = await apiRequest<{ success: boolean }>(
    `/supporters/${userId}`,
    { method: 'DELETE' }
  )
  return response?.success ?? false
}


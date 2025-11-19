import { create } from 'zustand'
import type { Job, CreateJobInput } from '@/types/job'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'
import {
  fetchJobsFromDataSource,
  createJobRecord,
  updateJobRecord,
  deleteJobRecord,
} from '@/lib/api'

interface JobsState {
  jobs: Job[]
  addJob: (job: CreateJobInput) => Promise<Job>
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>
  deleteJob: (id: string) => Promise<void>
  getJob: (id: string) => Job | undefined
  getJobsByCompany: (companyId: string) => Job[]
  initializeJobs: (jobs: Job[]) => void
  refresh: () => Promise<void>
}

const STORAGE_KEY = 'jobs'

export const useJobsStore = create<JobsState>()((set, get) => {
  // Load initial state from localStorage
  const storedJobs = getStorageItem<Job[]>(STORAGE_KEY) || []

  // Convert date strings back to Date objects
  const jobs = storedJobs.map((job) => ({
    ...job,
    createdAt: new Date(job.createdAt),
    updatedAt: job.updatedAt ? new Date(job.updatedAt) : undefined,
  }))

  const persistJobs = (updatedJobs: Job[]) => {
    setStorageItem(STORAGE_KEY, updatedJobs)
  }

  // seed from API if available
  fetchJobsFromDataSource().then((apiJobs) => {
    set({ jobs: apiJobs })
    persistJobs(apiJobs)
  })

  return {
    jobs,

    addJob: async (jobInput) => {
      const tempJob: Job = {
        ...jobInput,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      }
      set((state) => {
        const updatedJobs = [...state.jobs, tempJob]
        persistJobs(updatedJobs)
        return { jobs: updatedJobs }
      })
      const persistedJob = await createJobRecord(jobInput)
      if (persistedJob) {
        set((state) => {
          const updatedJobs = state.jobs.map((job) =>
            job.id === tempJob.id ? persistedJob : job
          )
          persistJobs(updatedJobs)
          return { jobs: updatedJobs }
        })
        return persistedJob
      }
      return tempJob
    },

    updateJob: async (id, updates) => {
      set((state) => {
        const updatedJobs = state.jobs.map((job) =>
          job.id === id ? { ...job, ...updates, updatedAt: new Date() } : job
        )
        persistJobs(updatedJobs)
        return { jobs: updatedJobs }
      })
      const persisted = await updateJobRecord(id, updates)
      if (persisted) {
        set((state) => {
          const updatedJobs = state.jobs.map((job) =>
            job.id === id ? persisted : job
          )
          persistJobs(updatedJobs)
          return { jobs: updatedJobs }
        })
      }
    },

    deleteJob: async (id) => {
      set((state) => {
        const updatedJobs = state.jobs.filter((job) => job.id !== id)
        persistJobs(updatedJobs)
        return { jobs: updatedJobs }
      })
      await deleteJobRecord(id)
    },

    getJob: (id) => {
      return get().jobs.find((job) => job.id === id)
    },

    getJobsByCompany: (companyId) => {
      return get().jobs.filter((job) => job.postedBy === companyId)
    },

    initializeJobs: (initialJobs) => {
      set({ jobs: initialJobs })
      persistJobs(initialJobs)
    },

    refresh: async () => {
      const remoteJobs = await fetchJobsFromDataSource()
      set({ jobs: remoteJobs })
      persistJobs(remoteJobs)
    },
  }
})


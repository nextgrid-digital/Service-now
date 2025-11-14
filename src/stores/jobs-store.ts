import { create } from 'zustand'
import type { Job, CreateJobInput } from '@/types/job'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'

interface JobsState {
  jobs: Job[]
  addJob: (job: CreateJobInput) => Job
  updateJob: (id: string, updates: Partial<Job>) => void
  deleteJob: (id: string) => void
  getJob: (id: string) => Job | undefined
  getJobsByCompany: (companyId: string) => Job[]
  initializeJobs: (jobs: Job[]) => void
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

  return {
    jobs,

    addJob: (jobInput) => {
      const newJob: Job = {
        ...jobInput,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      }
      set((state) => {
        const updatedJobs = [...state.jobs, newJob]
        setStorageItem(STORAGE_KEY, updatedJobs)
        return { jobs: updatedJobs }
      })
      return newJob
    },

    updateJob: (id, updates) => {
      set((state) => {
        const updatedJobs = state.jobs.map((job) =>
          job.id === id
            ? { ...job, ...updates, updatedAt: new Date() }
            : job
        )
        setStorageItem(STORAGE_KEY, updatedJobs)
        return { jobs: updatedJobs }
      })
    },

    deleteJob: (id) => {
      set((state) => {
        const updatedJobs = state.jobs.filter((job) => job.id !== id)
        setStorageItem(STORAGE_KEY, updatedJobs)
        return { jobs: updatedJobs }
      })
    },

    getJob: (id) => {
      return get().jobs.find((job) => job.id === id)
    },

    getJobsByCompany: (companyId) => {
      return get().jobs.filter((job) => job.postedBy === companyId)
    },

    initializeJobs: (initialJobs) => {
      set({ jobs: initialJobs })
      setStorageItem(STORAGE_KEY, initialJobs)
    },
  }
})


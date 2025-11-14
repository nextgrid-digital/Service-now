import { create } from 'zustand'
import type { Application } from '@/types/application'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'

interface ApplicationsState {
  applications: Application[]
  addApplication: (application: Omit<Application, 'id' | 'appliedAt'>) => Application
  updateApplication: (id: string, updates: Partial<Application>) => void
  getApplication: (id: string) => Application | undefined
  getApplicationsByUser: (userId: string) => Application[]
  getApplicationByJobAndUser: (jobId: string, userId: string) => Application | undefined
  hasApplied: (jobId: string, userId: string) => boolean
  initializeApplications: (applications: Application[]) => void
}

const STORAGE_KEY = 'applications'

export const useApplicationsStore = create<ApplicationsState>()((set, get) => {
  // Load initial state from localStorage
  const storedApplications = getStorageItem<Application[]>(STORAGE_KEY) || []

  // Convert date strings back to Date objects
  const applications = storedApplications.map((app) => ({
    ...app,
    appliedAt: new Date(app.appliedAt),
    updatedAt: app.updatedAt ? new Date(app.updatedAt) : undefined,
  }))

  return {
    applications,

    addApplication: (applicationInput) => {
      const newApplication: Application = {
        ...applicationInput,
        id: crypto.randomUUID(),
        appliedAt: new Date(),
      }
      set((state) => {
        const updatedApplications = [...state.applications, newApplication]
        setStorageItem(STORAGE_KEY, updatedApplications)
        return { applications: updatedApplications }
      })
      return newApplication
    },

    updateApplication: (id, updates) => {
      set((state) => {
        const updatedApplications = state.applications.map((app) =>
          app.id === id
            ? { ...app, ...updates, updatedAt: new Date() }
            : app
        )
        setStorageItem(STORAGE_KEY, updatedApplications)
        return { applications: updatedApplications }
      })
    },

    getApplication: (id) => {
      return get().applications.find((app) => app.id === id)
    },

    getApplicationsByUser: (userId) => {
      return get().applications.filter((app) => app.userId === userId)
    },

    getApplicationByJobAndUser: (jobId, userId) => {
      return get().applications.find(
        (app) => app.jobId === jobId && app.userId === userId
      )
    },

    hasApplied: (jobId, userId) => {
      return get().applications.some(
        (app) => app.jobId === jobId && app.userId === userId
      )
    },

    initializeApplications: (initialApplications) => {
      set({ applications: initialApplications })
      setStorageItem(STORAGE_KEY, initialApplications)
    },
  }
})


import { create } from 'zustand'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'
import {
  fetchSupporters,
  removeSupporterRecord,
  upsertSupporter,
  type SupporterRecord,
} from '@/lib/api'

export interface Supporter {
  userId: string
  isSupporter: boolean
  supportedAt?: Date
  amount?: number
}

interface SupporterState {
  supporters: Supporter[]
  isSupporter: (userId: string) => boolean
  setSupporter: (userId: string, amount?: number) => Promise<void>
  removeSupporter: (userId: string) => Promise<void>
  getAllSupporters: () => Supporter[]
  getFeaturedSupporters: (limit?: number) => Supporter[]
  refresh: () => Promise<void>
}

const STORAGE_KEY = 'supporters'

export const useSupporterStore = create<SupporterState>()((set, get) => {
  // Load initial state from localStorage
  const storedSupporters = getStorageItem<Supporter[]>(STORAGE_KEY) || []

  // Convert date strings back to Date objects
  const supporters = storedSupporters.map((supporter) => ({
    ...supporter,
    supportedAt: supporter.supportedAt
      ? new Date(supporter.supportedAt)
      : undefined,
  }))

  const persistSupporters = (updated: Supporter[]) => {
    setStorageItem(STORAGE_KEY, updated)
  }

  const hydrateSupporter = (record: SupporterRecord): Supporter => ({
    userId: record.userId,
    isSupporter: record.isSupporter,
    amount: record.amount,
    supportedAt: record.supportedAt ? new Date(record.supportedAt) : undefined,
  })

  fetchSupporters().then((apiSupporters) => {
    if (apiSupporters.length) {
      const hydrated = apiSupporters.map(hydrateSupporter)
      set({ supporters: hydrated })
      persistSupporters(hydrated)
    }
  })

  return {
    supporters,

    isSupporter: (userId) => {
      const supporter = get().supporters.find((s) => s.userId === userId)
      return supporter?.isSupporter ?? false
    },

    setSupporter: async (userId, amount) => {
      const newSupporter: Supporter = {
        userId,
        isSupporter: true,
        supportedAt: new Date(),
        amount,
      }

      set((state) => {
        const existingIndex = state.supporters.findIndex(
          (s) => s.userId === userId
        )

        const updatedSupporters =
          existingIndex >= 0
            ? state.supporters.map((supporter, index) =>
                index === existingIndex ? newSupporter : supporter
              )
            : [...state.supporters, newSupporter]

        persistSupporters(updatedSupporters)
        return { supporters: updatedSupporters }
      })

      await upsertSupporter({
        userId,
        isSupporter: true,
        amount,
        supportedAt: newSupporter.supportedAt?.toISOString(),
      })
    },

    removeSupporter: async (userId) => {
      set((state) => {
        const updatedSupporters = state.supporters.filter(
          (s) => s.userId !== userId
        )
        persistSupporters(updatedSupporters)
        return { supporters: updatedSupporters }
      })
      await removeSupporterRecord(userId)
    },

    getAllSupporters: () => {
      return get().supporters.filter((s) => s.isSupporter)
    },

    getFeaturedSupporters: (limit = 10) => {
      return get()
        .supporters.filter((s) => s.isSupporter)
        .sort((a, b) => {
          // Sort by amount (descending), then by date (descending)
          const amountDiff = (b.amount || 0) - (a.amount || 0)
          if (amountDiff !== 0) return amountDiff
          return (
            (b.supportedAt?.getTime() || 0) - (a.supportedAt?.getTime() || 0)
          )
        })
        .slice(0, limit)
    },

    refresh: async () => {
      const apiSupporters = await fetchSupporters()
      if (apiSupporters.length) {
        const hydrated = apiSupporters.map(hydrateSupporter)
        set({ supporters: hydrated })
        persistSupporters(hydrated)
      }
    },
  }
})


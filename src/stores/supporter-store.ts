import { create } from 'zustand'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'

interface Supporter {
  userId: string
  isSupporter: boolean
  supportedAt?: Date
  amount?: number
}

interface SupporterState {
  supporters: Supporter[]
  isSupporter: (userId: string) => boolean
  setSupporter: (userId: string, amount?: number) => void
  removeSupporter: (userId: string) => void
  getAllSupporters: () => Supporter[]
  getFeaturedSupporters: (limit?: number) => Supporter[]
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

  return {
    supporters,

    isSupporter: (userId) => {
      const supporter = get().supporters.find((s) => s.userId === userId)
      return supporter?.isSupporter ?? false
    },

    setSupporter: (userId, amount) => {
      set((state) => {
        const existingIndex = state.supporters.findIndex(
          (s) => s.userId === userId
        )

        const newSupporter: Supporter = {
          userId,
          isSupporter: true,
          supportedAt: new Date(),
          amount,
        }

        let updatedSupporters: Supporter[]
        if (existingIndex >= 0) {
          updatedSupporters = [...state.supporters]
          updatedSupporters[existingIndex] = newSupporter
        } else {
          updatedSupporters = [...state.supporters, newSupporter]
        }

        setStorageItem(STORAGE_KEY, updatedSupporters)
        return { supporters: updatedSupporters }
      })
    },

    removeSupporter: (userId) => {
      set((state) => {
        const updatedSupporters = state.supporters.filter(
          (s) => s.userId !== userId
        )
        setStorageItem(STORAGE_KEY, updatedSupporters)
        return { supporters: updatedSupporters }
      })
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
  }
})


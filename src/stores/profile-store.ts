import { create } from 'zustand'
import type { Profile } from '@/types/profile'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'

interface ProfileState {
  profiles: Profile[]
  getProfile: (userId: string) => Profile | undefined
  setProfile: (profile: Profile) => void
  updateProfile: (userId: string, updates: Partial<Profile>) => void
  hasProfile: (userId: string) => boolean
}

const STORAGE_KEY = 'profiles'

export const useProfileStore = create<ProfileState>()((set, get) => {
  // Load initial state from localStorage
  const storedProfiles = getStorageItem<Profile[]>(STORAGE_KEY) || []

  // Convert date strings back to Date objects
  const profiles = storedProfiles.map((profile) => ({
    ...profile,
    updatedAt: profile.updatedAt ? new Date(profile.updatedAt) : undefined,
  }))

  return {
    profiles,

    getProfile: (userId) => {
      return get().profiles.find((profile) => profile.userId === userId)
    },

    setProfile: (profile) => {
      set((state) => {
        const existingIndex = state.profiles.findIndex(
          (p) => p.userId === profile.userId
        )
        const updatedProfile = {
          ...profile,
          updatedAt: new Date(),
        }

        let updatedProfiles: Profile[]
        if (existingIndex >= 0) {
          updatedProfiles = [...state.profiles]
          updatedProfiles[existingIndex] = updatedProfile
        } else {
          updatedProfiles = [...state.profiles, updatedProfile]
        }

        setStorageItem(STORAGE_KEY, updatedProfiles)
        return { profiles: updatedProfiles }
      })
    },

    updateProfile: (userId, updates) => {
      set((state) => {
        const existingIndex = state.profiles.findIndex(
          (p) => p.userId === userId
        )

        if (existingIndex >= 0) {
          const updatedProfiles = [...state.profiles]
          updatedProfiles[existingIndex] = {
            ...updatedProfiles[existingIndex],
            ...updates,
            updatedAt: new Date(),
          }
          setStorageItem(STORAGE_KEY, updatedProfiles)
          return { profiles: updatedProfiles }
        }

        return state
      })
    },

    hasProfile: (userId) => {
      return get().profiles.some((profile) => profile.userId === userId)
    },
  }
})


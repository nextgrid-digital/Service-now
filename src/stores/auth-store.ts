import { create } from 'zustand'
import type { UserType } from '@/types/user'

const DEFAULT_USER = {
  accountNo: 'SN-0001',
  email: 'jane.doe@example.com',
  role: ['job_seeker'],
  userType: 'job_seeker' as UserType,
  userId: 'user-1',
  name: 'Jane Doe',
  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
} satisfies AuthUser

export interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  userType?: UserType
  userId?: string
  name?: string
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    isJobSeeker: () => boolean
    isCompany: () => boolean
    isAdmin: () => boolean
  }
}

export const useAuthStore = create<AuthState>()((set, get) => {
  return {
    auth: {
      user: DEFAULT_USER,
      setUser: (user) =>
        set((state) => ({
          ...state,
          auth: { ...state.auth, user: user ?? DEFAULT_USER },
        })),
      accessToken: 'mock-token',
      setAccessToken: (accessToken) =>
        set((state) => ({
          ...state,
          auth: { ...state.auth, accessToken },
        })),
      resetAccessToken: () =>
        set((state) => ({
          ...state,
          auth: { ...state.auth, accessToken: 'mock-token' },
        })),
      reset: () =>
        set((state) => ({
          ...state,
          auth: { ...state.auth, user: DEFAULT_USER, accessToken: 'mock-token' },
        })),
      isJobSeeker: () => {
        const user = get().auth.user
        return user?.userType === 'job_seeker'
      },
      isCompany: () => {
        const user = get().auth.user
        return user?.userType === 'company'
      },
      isAdmin: () => {
        const user = get().auth.user
        return user?.userType === 'admin'
      },
    },
  }
})

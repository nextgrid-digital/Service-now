import { useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { ProfileBuilderContent } from './components/profile-builder'
import { generateSampleProfile } from './data/sample-profile'

export function ProfileBuilder() {
  const { auth } = useAuthStore()
  const { getProfile, setProfile } = useProfileStore()
  const userId = auth.user?.userId

  useEffect(() => {
    if (!userId) {
      return
    }

    // Initialize profile with sample data if it doesn't exist or is empty
    const existingProfile = getProfile(userId)
    if (!existingProfile) {
      const sampleProfile = generateSampleProfile(userId)
      setProfile(sampleProfile)
    } else {
      // Check if profile is essentially empty (no data in any section)
      const isEmpty =
        !existingProfile.summary &&
        existingProfile.workExperience.length === 0 &&
        existingProfile.education.length === 0 &&
        existingProfile.skills.length === 0 &&
        existingProfile.projects.length === 0 &&
        existingProfile.certifications.length === 0 &&
        existingProfile.volunteering.length === 0 &&
        existingProfile.awards.length === 0 &&
        existingProfile.speaking.length === 0 &&
        !existingProfile.contact

      // If profile is empty, populate with sample data
      if (isEmpty) {
        const sampleProfile = generateSampleProfile(userId)
        setProfile(sampleProfile)
      }
    }
  }, [userId, getProfile, setProfile])

  if (!userId) {
    return null
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Build Your Profile
          </h1>
          <p className='text-muted-foreground'>
            Create a professional profile to apply for ServiceNow jobs
          </p>
        </div>
        <ProfileBuilderContent />
      </Main>
    </>
  )
}


import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { useAuthStore } from '@/stores/auth-store'
import { PostJobForm } from './post-job-form'

export function PostJob() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  useEffect(() => {
    if (!auth.user?.userId || !auth.isCompany()) {
      navigate({ to: '/' })
    }
  }, [auth, navigate])

  if (!auth.user?.userId || !auth.isCompany()) {
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
          <h1 className='text-2xl font-bold tracking-tight'>Post a Job</h1>
          <p className='text-muted-foreground'>
            Post a ServiceNow job opening for $49 USD
          </p>
        </div>
        <PostJobForm />
      </Main>
    </>
  )
}


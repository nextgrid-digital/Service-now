import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { BecomeSupporterCard } from './components/become-supporter-card'
import { FeaturedSupporters } from './components/featured-supporters'

export function SupporterPage() {
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
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Become a Supporter</h1>
          <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
            Support the ServiceNow job platform and get a special badge on your profile
          </p>
        </div>
        <div className='grid gap-6 lg:grid-cols-2'>
          <BecomeSupporterCard />
          <FeaturedSupporters />
        </div>
      </Main>
    </>
  )
}


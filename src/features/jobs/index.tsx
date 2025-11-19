import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { useJobsStore } from '@/stores/jobs-store'
import { getStorageItem, setStorageItem } from '@/lib/local-storage'
import { JobsGrid } from './components/jobs-grid'
import { JobsFeed } from './components/jobs-feed'
import { JobsFilter, type SortOption } from './components/jobs-filter'
import { ViewToggle, type ViewMode } from './components/view-toggle'
import { BecomeSupporterCard } from '@/features/supporter/components/become-supporter-card'
import { JobsSpotlight } from './components/jobs-spotlight'
import { Button } from '@/components/ui/button'
import { JobsHero } from './components/jobs-hero'

export function JobsListing() {
  const { jobs, refresh } = useJobsStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [view, setView] = useState<ViewMode>(() => {
    const savedView = getStorageItem<ViewMode>('jobs-view')
    return savedView || 'grid'
  })

  // Refresh jobs from API/Sheets when empty
  useEffect(() => {
    if (jobs.length === 0) {
      void refresh()
    }
  }, [jobs.length, refresh])

  const handleViewChange = (newView: ViewMode) => {
    setView(newView)
    setStorageItem('jobs-view', newView)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <Button asChild variant='default'>
            <Link to='/jobs/post'>Post a Job</Link>
          </Button>
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-6 sm:gap-8'>
        <JobsHero />

        <div className='flex flex-col gap-6'>
          <JobsSpotlight />

          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                All ServiceNow jobs
              </h2>
              <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
                Search, filter, and switch between feed or grid views.
              </p>
            </div>
            <ViewToggle view={view} onViewChange={handleViewChange} />
          </div>
          <JobsFilter
            searchQuery={searchQuery}
            locationFilter={locationFilter}
            typeFilter={typeFilter}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onLocationChange={setLocationFilter}
            onTypeChange={setTypeFilter}
            onSortChange={setSortBy}
          />
        </div>
        {view === 'grid' ? (
          <div className='grid gap-4 lg:grid-cols-4 lg:gap-6'>
            <div className='lg:col-span-3'>
              <JobsGrid
                searchQuery={searchQuery}
                locationFilter={locationFilter}
                typeFilter={typeFilter}
                sortBy={sortBy}
              />
            </div>
            <div className='hidden lg:block lg:col-span-1'>
              <BecomeSupporterCard />
            </div>
          </div>
        ) : (
          <div className='grid gap-4 lg:grid-cols-4 lg:gap-6'>
            <div className='lg:col-span-3'>
              <JobsFeed
                searchQuery={searchQuery}
                locationFilter={locationFilter}
                typeFilter={typeFilter}
                sortBy={sortBy}
              />
            </div>
            <div className='hidden lg:block lg:col-span-1'>
              <BecomeSupporterCard />
            </div>
          </div>
        )}
      </Main>
    </>
  )
}


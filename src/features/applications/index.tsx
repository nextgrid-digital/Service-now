import { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { useAuthStore } from '@/stores/auth-store'
import { useApplicationsStore } from '@/stores/applications-store'
import { useJobsStore } from '@/stores/jobs-store'
import { ApplicationsList } from './components/applications-list'
import { generateSampleApplications } from './data/sample-applications'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Applications() {
  const { auth } = useAuthStore()
  const { applications: allApplications, getApplicationsByUser, initializeApplications } = useApplicationsStore()
  const { getJob } = useJobsStore()
  const userId = auth.user?.userId
  const [statusFilter, setStatusFilter] = useState<string>('')

  // Initialize sample applications if empty and user is logged in
  useEffect(() => {
    if (userId && allApplications.length === 0) {
      const sampleApps = generateSampleApplications(userId, 8)
      initializeApplications(sampleApps)
    }
  }, [userId, allApplications.length, initializeApplications])

  const applications = useMemo(() => {
    if (!userId) return []
    return getApplicationsByUser(userId)
  }, [userId, getApplicationsByUser])

  const filteredApplications = useMemo(() => {
    if (!statusFilter) return applications
    return applications.filter((app) => app.status === statusFilter)
  }, [applications, statusFilter])

  const applicationsWithJobs = useMemo(() => {
    return filteredApplications.map((app) => ({
      application: app,
      job: getJob(app.jobId),
    }))
  }, [filteredApplications, getJob])

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
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>My Applications</h1>
            <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
              Track your job applications and their status
            </p>
          </div>
          {applications.length > 0 && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=''>All Statuses</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='reviewing'>Reviewing</SelectItem>
                <SelectItem value='shortlisted'>Shortlisted</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
                <SelectItem value='accepted'>Accepted</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <ApplicationsList applications={applicationsWithJobs} />
      </Main>
    </>
  )
}


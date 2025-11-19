import { useEffect } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth-store'
import { useJobsStore } from '@/stores/jobs-store'
import { formatDistanceToNow } from 'date-fns'

export function MyJobs() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const { getJobsByCompany, deleteJob } = useJobsStore()
  const userId = auth.user?.userId

  useEffect(() => {
    if (!userId || !auth.isCompany()) {
      navigate({ to: '/' })
    }
  }, [userId, auth, navigate])

  if (!userId || !auth.isCompany()) {
    return null
  }

  const jobs = getJobsByCompany(userId)

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
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>My Job Postings</h2>
            <p className='text-muted-foreground'>
              Manage your posted ServiceNow jobs
            </p>
          </div>
          <Button asChild>
            <Link to='/jobs/post'>
              <Plus className='mr-2 h-4 w-4' />
              Post a Job
            </Link>
          </Button>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <p className='text-muted-foreground text-lg'>No jobs posted yet</p>
              <Button asChild className='mt-4'>
                <Link to='/jobs/post'>
                  <Plus className='mr-2 h-4 w-4' />
                  Post Your First Job
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='space-y-4'>
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle>{job.title}</CardTitle>
                      <p className='text-muted-foreground mt-1'>{job.company}</p>
                      <p className='text-muted-foreground mt-1 text-sm'>
                        Posted {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='ghost' size='icon'>
                        <Pencil className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={async () => {
                          await deleteJob(job.id)
                        }}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground line-clamp-2 text-sm'>
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Main>
    </>
  )
}


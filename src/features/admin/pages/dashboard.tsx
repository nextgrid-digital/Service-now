import { useEffect, useMemo, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'
import {
  fetchPostingRequests,
  fetchSpotlightJobs,
  type PostingRequest,
  type SpotlightJob,
} from '@/lib/api'
import { useJobsStore } from '@/stores/jobs-store'
import { useSupporterStore, type Supporter } from '@/stores/supporter-store'
import type { Job } from '@/types/job'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AdminDashboard() {
  const { jobs, deleteJob } = useJobsStore()
  const { supporters, removeSupporter } = useSupporterStore()
  const [spotlightQueue, setSpotlightQueue] = useState<SpotlightJob[]>([])
  const [postingRequests, setPostingRequests] = useState<PostingRequest[]>([])
  const [loadingSpotlight, setLoadingSpotlight] = useState(true)
  const [loadingRequests, setLoadingRequests] = useState(true)

  const supporterCount = supporters.filter((s) => s.isSupporter).length
  const fallbackRequests = useMemo(
    () =>
      jobs.slice(0, 3).map((job, index) => ({
        id: `request-${index}`,
        company: job.company,
        jobTitle: job.title,
        amountPaid: 49,
        status: 'pending' as PostingRequest['status'],
        createdAt: job.createdAt.toISOString(),
      })),
    [jobs]
  )

  useEffect(() => {
    fetchSpotlightJobs()
      .then((entries) => {
        if (entries.length) {
          setSpotlightQueue(entries)
        } else {
          setSpotlightQueue(
            jobs.slice(0, 3).map((job, index) => ({
              jobId: job.id,
              priority: index + 1,
              paid: index === 0,
            }))
          )
        }
      })
      .finally(() => setLoadingSpotlight(false))
  }, [jobs])

  useEffect(() => {
    fetchPostingRequests()
      .then((requests) => {
        setPostingRequests(requests.length ? requests : fallbackRequests)
      })
      .finally(() => setLoadingRequests(false))
  }, [fallbackRequests])

  const latestJobs = jobs.slice(0, 5)

  const handleJobDelete = async (id: string) => {
    toast.promise(deleteJob(id), {
      loading: 'Removing job…',
      success: 'Job removed from marketplace',
      error: 'Failed to remove job',
    })
  }

  const handleSpotlightAction = (jobId: string, action: 'approve' | 'remove') => {
    setSpotlightQueue((prev) =>
      prev.filter((entry) => (action === 'remove' ? entry.jobId !== jobId : true))
    )
    toast.success(
      action === 'approve'
        ? 'Spotlight entry approved'
        : 'Spotlight entry removed'
    )
  }

  const handleRequestAction = (requestId: string, status: PostingRequest['status']) => {
    setPostingRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    )
    toast.success(`Request marked as ${status}`)
  }

  const handleSupporterRemove = async (userId: string) => {
    toast.promise(removeSupporter(userId), {
      loading: 'Removing supporter…',
      success: 'Supporter removed',
      error: 'Failed to update supporter list',
    })
  }

  return (
    <div className='space-y-8'>
      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <AdminStatCard
          label='Active Jobs'
          value={jobs.length}
          description='Listings visible to candidates'
        />
        <AdminStatCard
          label='Spotlight Queue'
          value={spotlightQueue.length}
          description='Paid placements awaiting review'
        />
        <AdminStatCard
          label='Supporters'
          value={supporterCount}
          description='Members funding the platform'
        />
        <AdminStatCard
          label='Posting Requests'
          value={postingRequests.length}
          description='Awaiting manual approval'
        />
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        <Card className='lg:col-span-2'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <div>
              <CardTitle className='text-lg'>Latest job submissions</CardTitle>
              <CardDescription>
                Automatically synced from your connected sheet/API
              </CardDescription>
            </div>
            <Button variant='outline' size='sm'>
              Refresh data
            </Button>
          </CardHeader>
          <CardContent className='space-y-4'>
            {latestJobs.length === 0 ? (
              <p className='text-muted-foreground text-sm'>
                No jobs available yet. Once your data source is connected, new
                listings will show up here automatically.
              </p>
            ) : (
              latestJobs.map((job) => (
                <div
                  key={job.id}
                  className='flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-3'
                >
                  <div>
                    <p className='font-medium leading-tight'>{job.title}</p>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      {job.company} •{' '}
                      {formatDistanceToNow(job.createdAt, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm'>
                      Publish
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleJobDelete(job.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <SpotlightPanel
          loading={loadingSpotlight}
          spotlightQueue={spotlightQueue}
          onAction={handleSpotlightAction}
          jobs={jobs}
        />
      </section>

      <section className='grid gap-4 lg:grid-cols-2'>
        <PostingRequestsPanel
          loading={loadingRequests}
          requests={postingRequests}
          onAction={handleRequestAction}
        />
        <SupportersPanel
          supporters={supporters}
          onRemove={handleSupporterRemove}
        />
      </section>
    </div>
  )
}

type AdminStatCardProps = {
  label: string
  value: number
  description: string
}

function AdminStatCard({ label, value, description }: AdminStatCardProps) {
  return (
    <Card>
      <CardHeader className='space-y-0 pb-2'>
        <CardDescription>{label}</CardDescription>
        <CardTitle className='text-3xl font-semibold'>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </CardContent>
    </Card>
  )
}

type SpotlightPanelProps = {
  loading: boolean
  spotlightQueue: SpotlightJob[]
  jobs: Job[]
  onAction: (jobId: string, action: 'approve' | 'remove') => void
}

function SpotlightPanel({
  loading,
  spotlightQueue,
  jobs,
  onAction,
}: SpotlightPanelProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div>
          <CardTitle className='text-lg'>Spotlight manager</CardTitle>
          <CardDescription>
            Promote jobs that completed the paid campaign
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className='text-muted-foreground text-sm'>Loading spotlight data…</p>
        ) : spotlightQueue.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            No spotlight entries yet. Paid jobs will appear here once your API
            syncs.
          </p>
        ) : (
          <div className='space-y-3'>
            {spotlightQueue.map((entry) => {
              const job = jobs.find((j) => j.id === entry.jobId)
              return (
                <div
                  key={entry.jobId}
                  className='flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-3'
                >
                  <div>
                    <p className='font-medium leading-tight'>
                      {job?.title ?? 'Unknown job'}
                    </p>
                    <p className='text-muted-foreground text-xs'>
                      Priority #{entry.priority}{' '}
                      {entry.paid && <Badge className='ml-1'>Paid</Badge>}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='secondary'
                      onClick={() => onAction(entry.jobId, 'approve')}
                    >
                      Approve
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => onAction(entry.jobId, 'remove')}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

type PostingRequestsPanelProps = {
  loading: boolean
  requests: PostingRequest[]
  onAction: (id: string, status: PostingRequest['status']) => void
}

function PostingRequestsPanel({
  loading,
  requests,
  onAction,
}: PostingRequestsPanelProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div>
          <CardTitle className='text-lg'>Posting requests</CardTitle>
          <CardDescription>
            Review incoming submissions before publishing
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {loading ? (
          <p className='text-muted-foreground text-sm'>Loading requests…</p>
        ) : requests.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            All caught up! New requests will appear automatically when your CSV
            or sheet syncs.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className='hidden lg:table-cell'>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className='font-medium'>{request.company}</TableCell>
                  <TableCell>{request.jobTitle}</TableCell>
                  <TableCell className='hidden lg:table-cell'>
                    ${request.amountPaid}
                  </TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'pending' ? 'outline' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => onAction(request.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => onAction(request.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

type SupportersPanelProps = {
  supporters: Supporter[]
  onRemove: (userId: string) => void
}

function SupportersPanel({ supporters, onRemove }: SupportersPanelProps) {
  const activeSupporters = supporters.filter((supporter) => supporter.isSupporter)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <div>
          <CardTitle className='text-lg'>Supporters</CardTitle>
          <CardDescription>
            Celebrate community members funding the platform
          </CardDescription>
        </div>
        <Badge variant='outline'>{activeSupporters.length}</Badge>
      </CardHeader>
      <CardContent className='space-y-3'>
        {activeSupporters.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            No supporters yet. Encourage early adopters to back the platform to
            unlock premium benefits.
          </p>
        ) : (
          activeSupporters.map((supporter) => (
            <div
              key={supporter.userId}
              className='flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-3'
            >
              <div>
                <p className='font-medium leading-tight'>{supporter.userId}</p>
                <p className='text-muted-foreground text-xs'>
                  Supported{' '}
                  {supporter.supportedAt
                    ? formatDistanceToNow(supporter.supportedAt, {
                        addSuffix: true,
                      })
                    : 'recently'}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                {supporter.amount && (
                  <Badge variant='secondary'>${supporter.amount}</Badge>
                )}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => onRemove(supporter.userId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}


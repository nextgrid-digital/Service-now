import { useMemo, type ReactNode } from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { ShieldAlert, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdminLayout } from '@/features/admin/components/admin-layout'
import { AuthModalButtons } from '@/components/auth-modal'

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean)

export const Route = createFileRoute('/admin')({
  component: AdminRoute,
})

function AdminRoute() {
  const { isLoaded, isSignedIn, user } = useUser()

  const isAdmin = useMemo(() => {
    if (!user) return false
    const publicRole = user.publicMetadata?.role
    if (publicRole === 'admin') return true

    if (ADMIN_EMAILS.length === 0) {
      return !!user.primaryEmailAddress
    }

    const email = user.primaryEmailAddress?.emailAddress?.toLowerCase()
    return email ? ADMIN_EMAILS.includes(email) : false
  }, [user])

  if (!isLoaded) {
    return (
      <GuardMessage
        title='Checking access'
        description='Please wait while we verify your admin status.'
        isLoading
      />
    )
  }

  if (!isSignedIn) {
    return (
      <GuardMessage
        title='Sign in required'
        description='Only authenticated admins can view the control center.'
        action={<AuthModalButtons />}
      />
    )
  }

  if (!isAdmin) {
    return (
      <GuardMessage
        title='Access denied'
        description='This account is not authorized to manage jobs. Contact the platform owner to enable admin access.'
        action={
          <Button asChild variant='outline'>
            <Link to='/'>Return home</Link>
          </Button>
        }
      />
    )
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

type GuardMessageProps = {
  title: string
  description: string
  action?: ReactNode
  isLoading?: boolean
}

function GuardMessage({
  title,
  description,
  action,
  isLoading = false,
}: GuardMessageProps) {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-4 bg-muted/40 px-6 text-center'>
      <div className='flex flex-col items-center gap-3'>
        {isLoading ? (
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        ) : (
          <ShieldAlert className='h-8 w-8 text-primary' />
        )}
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-muted-foreground max-w-md text-sm'>{description}</p>
      </div>
      {action}
    </div>
  )
}


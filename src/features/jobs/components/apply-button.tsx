import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useApplicationsStore } from '@/stores/applications-store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ApplyButtonProps {
  jobId: string
  applied?: boolean
  className?: string
}

export function ApplyButton({
  jobId,
  applied = false,
  className,
}: ApplyButtonProps) {
  const [isApplying, setIsApplying] = useState(false)
  const { auth } = useAuthStore()
  const { addApplication } = useApplicationsStore()
  const userId = auth.user?.userId ?? 'public-user'

  const handleApply = async () => {
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      addApplication({
        jobId,
        userId,
        status: 'pending',
      })
      setIsApplying(false)
      toast.success('Application submitted successfully!')
    }, 1000)
  }

  if (applied) {
    return (
      <Button disabled variant='secondary' className={cn('w-full', className)}>
        <Check className='mr-2 h-4 w-4' />
        Applied
      </Button>
    )
  }

  return (
    <Button
      onClick={handleApply}
      disabled={isApplying}
      className={cn('w-full', className)}
    >
      {isApplying ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Applying...
        </>
      ) : (
        'Apply Now'
      )}
    </Button>
  )
}


import { useState } from 'react'
import { Heart, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SupporterBadge } from '@/components/supporter-badge'
import { SupporterModal } from './supporter-modal'
import { useAuthStore } from '@/stores/auth-store'
import { useSupporterStore } from '@/stores/supporter-store'

export function BecomeSupporterCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { auth } = useAuthStore()
  const { isSupporter } = useSupporterStore()
  const userId = auth.user?.userId
  const supporter = userId ? isSupporter(userId) : false

  if (supporter) {
    return (
      <Card className='border-primary/20 bg-primary/5'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <CheckCircle2 className='h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>You're a Supporter!</CardTitle>
          </div>
          <CardDescription className='text-xs sm:text-sm'>
            Thank you for supporting the ServiceNow job platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3'>
            <SupporterBadge />
            <span className='text-xs sm:text-sm text-muted-foreground'>
              Your supporter badge is visible on your profile
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className='border-primary/20 bg-primary/5'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Heart className='h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0' />
            <CardTitle className='text-base sm:text-lg'>Become a Supporter</CardTitle>
          </div>
          <CardDescription className='text-xs sm:text-sm'>
            Support the ServiceNow job platform and get a special badge on your profile
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button onClick={() => setModalOpen(true)} className='w-full text-xs sm:text-sm'>
            <Heart className='mr-2 h-3 w-3 sm:h-4 sm:w-4' />
            Become a Supporter
          </Button>
          <div className='rounded-lg border bg-background p-3 sm:p-4'>
            <p className='text-xs sm:text-sm font-medium mb-2'>Benefits:</p>
            <ul className='text-muted-foreground space-y-1.5 sm:space-y-2 text-xs sm:text-sm'>
              <li className='flex items-start sm:items-center gap-2'>
                <CheckCircle2 className='h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5 sm:mt-0' />
                <span>Special supporter badge on your profile</span>
              </li>
              <li className='flex items-start sm:items-center gap-2'>
                <CheckCircle2 className='h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5 sm:mt-0' />
                <span>Featured in our supporters list</span>
              </li>
              <li className='flex items-start sm:items-center gap-2'>
                <CheckCircle2 className='h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5 sm:mt-0' />
                <span>Help grow the ServiceNow community</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <SupporterModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}


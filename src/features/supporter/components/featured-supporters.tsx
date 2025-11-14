import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SupporterBadge } from '@/components/supporter-badge'
import { useSupporterStore } from '@/stores/supporter-store'
import { getUserById } from '@/features/jobs/data/sample-users'
import { Heart } from 'lucide-react'

export function FeaturedSupporters() {
  const { getFeaturedSupporters } = useSupporterStore()
  const supporters = getFeaturedSupporters(10)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Heart className='h-5 w-5 text-primary' />
          <CardTitle>Featured Supporters</CardTitle>
        </div>
        <CardDescription>
          Thank you to our supporters who help make this platform possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        {supporters.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-muted-foreground text-sm'>
              No supporters yet. Be the first to support the platform!
            </p>
          </div>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {supporters.map((supporter) => {
              const user = getUserById(supporter.userId)
              if (!user) return null
              return (
                <div
                  key={supporter.userId}
                  className='flex items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-muted/50'
                >
                  <span className='font-medium text-sm'>{user.name}</span>
                  <SupporterBadge />
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


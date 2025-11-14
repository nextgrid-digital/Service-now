import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

export function SupporterBadge() {
  return (
    <Badge variant='default' className='gap-1 bg-primary'>
      <Heart className='h-3 w-3 fill-current' />
      Supporter
    </Badge>
  )
}


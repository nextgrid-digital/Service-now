import { Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ViewMode = 'grid' | 'feed'

interface ViewToggleProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className='flex items-center gap-1 rounded-lg border p-1'>
      <Button
        variant={view === 'grid' ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onViewChange('grid')}
        className={cn(
          'h-8 px-2 sm:px-3',
          view === 'grid' && 'bg-secondary'
        )}
      >
        <Grid3x3 className='h-4 w-4 sm:mr-2' />
        <span className='hidden sm:inline'>Grid</span>
      </Button>
      <Button
        variant={view === 'feed' ? 'secondary' : 'ghost'}
        size='sm'
        onClick={() => onViewChange('feed')}
        className={cn(
          'h-8 px-2 sm:px-3',
          view === 'feed' && 'bg-secondary'
        )}
      >
        <List className='h-4 w-4 sm:mr-2' />
        <span className='hidden sm:inline'>Feed</span>
      </Button>
    </div>
  )
}


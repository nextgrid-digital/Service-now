import { Badge } from '@/components/ui/badge'
import type { ApplicationStatus } from '@/types/application'
import { cn } from '@/lib/utils'

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
  className?: string
}

const statusConfig: Record<ApplicationStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  reviewing: { label: 'Reviewing', variant: 'secondary' },
  shortlisted: { label: 'Shortlisted', variant: 'default' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  accepted: { label: 'Accepted', variant: 'default' },
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  )
}

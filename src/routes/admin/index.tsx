import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '@/features/admin/pages/dashboard'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

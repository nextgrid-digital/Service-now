import { createFileRoute } from '@tanstack/react-router'
import { ProfileBuilder } from '@/features/profile'

export const Route = createFileRoute('/_authenticated/profile/builder')({
  component: ProfileBuilder,
})


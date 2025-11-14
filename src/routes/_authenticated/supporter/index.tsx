import { createFileRoute } from '@tanstack/react-router'
import { SupporterPage } from '@/features/supporter'

export const Route = createFileRoute('/_authenticated/supporter/')({
  component: SupporterPage,
})


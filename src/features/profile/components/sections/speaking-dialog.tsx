import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { speakingSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, Speaking } from '@/types/profile'
import { z } from 'zod'

const speakingFormSchema = speakingSchema.omit({ id: true })
type SpeakingForm = z.infer<typeof speakingFormSchema>

interface SpeakingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  speaking: Speaking | null
  profile: Profile
}

export function SpeakingDialog({ open, onOpenChange, speaking, profile }: SpeakingDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<SpeakingForm>({
    resolver: zodResolver(speakingFormSchema),
    defaultValues: speaking || {
      event: '',
      topic: '',
      date: '',
      location: '',
      description: '',
      url: '',
    },
  })

  const onSubmit = (data: SpeakingForm) => {
    if (!userId) return
    const newItem: Speaking = {
      id: speaking?.id || crypto.randomUUID(),
      ...data,
    }
    const updated = speaking
      ? profile.speaking.map((s) => (s.id === speaking.id ? newItem : s))
      : [...profile.speaking, newItem]
    updateProfile(userId, { speaking: updated })
    form.reset()
    onOpenChange(false)
    toast.success(speaking ? 'Speaking engagement updated' : 'Speaking engagement added')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{speaking ? 'Edit Speaking Engagement' : 'Add Speaking Engagement'}</DialogTitle>
          <DialogDescription>Add speaking engagement details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='event' render={({ field }) => (
              <FormItem>
                <FormLabel>Event *</FormLabel>
                <FormControl><Input placeholder='Event Name' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='topic' render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl><Input placeholder='Presentation Topic' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type='submit'>{speaking ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


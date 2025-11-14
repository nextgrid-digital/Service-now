// @ts-nocheck
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { volunteeringSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, Volunteering } from '@/types/profile'
import { z } from 'zod'

const volunteeringFormSchema = volunteeringSchema.omit({ id: true })
type VolunteeringForm = z.infer<typeof volunteeringFormSchema>

interface VolunteeringDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  volunteering: Volunteering | null
  profile: Profile
}

export function VolunteeringDialog({ open, onOpenChange, volunteering, profile }: VolunteeringDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<VolunteeringForm>({
    resolver: zodResolver(volunteeringFormSchema),
    defaultValues: volunteering || {
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  })

  const onSubmit = (data: VolunteeringForm) => {
    if (!userId) return
    const newItem: Volunteering = {
      id: volunteering?.id || crypto.randomUUID(),
      ...data,
    }
    const updated = volunteering
      ? profile.volunteering.map((v) => (v.id === volunteering.id ? newItem : v))
      : [...profile.volunteering, newItem]
    updateProfile(userId, { volunteering: updated })
    form.reset()
    onOpenChange(false)
    toast.success(volunteering ? 'Volunteering updated' : 'Volunteering added')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{volunteering ? 'Edit Volunteering' : 'Add Volunteering'}</DialogTitle>
          <DialogDescription>Add volunteering experience</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='organization' render={({ field }) => (
              <FormItem>
                <FormLabel>Organization *</FormLabel>
                <FormControl><Input placeholder='Organization Name' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='role' render={({ field }) => (
              <FormItem>
                <FormLabel>Role *</FormLabel>
                <FormControl><Input placeholder='Volunteer Role' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type='submit'>{volunteering ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


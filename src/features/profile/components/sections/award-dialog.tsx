import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { awardSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, Award } from '@/types/profile'
import { z } from 'zod'

const awardFormSchema = awardSchema.omit({ id: true })
type AwardForm = z.infer<typeof awardFormSchema>

interface AwardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  award: Award | null
  profile: Profile
}

export function AwardDialog({ open, onOpenChange, award, profile }: AwardDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<AwardForm>({
    resolver: zodResolver(awardFormSchema),
    defaultValues: award || {
      title: '',
      issuer: '',
      date: '',
      description: '',
    },
  })

  const onSubmit = (data: AwardForm) => {
    if (!userId) return
    const newAward: Award = {
      id: award?.id || crypto.randomUUID(),
      ...data,
    }
    const updated = award
      ? profile.awards.map((a) => (a.id === award.id ? newAward : a))
      : [...profile.awards, newAward]
    updateProfile(userId, { awards: updated })
    form.reset()
    onOpenChange(false)
    toast.success(award ? 'Award updated' : 'Award added')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{award ? 'Edit Award' : 'Add Award'}</DialogTitle>
          <DialogDescription>Add award details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='title' render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl><Input placeholder='Award Title' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='issuer' render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer</FormLabel>
                <FormControl><Input placeholder='Issuing Organization' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type='submit'>{award ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


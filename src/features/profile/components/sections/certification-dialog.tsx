import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { certificationSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, Certification } from '@/types/profile'
import { z } from 'zod'

const certFormSchema = certificationSchema.omit({ id: true })
type CertForm = z.infer<typeof certFormSchema>

interface CertificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  certification: Certification | null
  profile: Profile
}

export function CertificationDialog({ open, onOpenChange, certification, profile }: CertificationDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<CertForm>({
    resolver: zodResolver(certFormSchema),
    defaultValues: certification || {
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    },
  })

  const onSubmit = (data: CertForm) => {
    if (!userId) return
    const newCert: Certification = {
      id: certification?.id || crypto.randomUUID(),
      ...data,
    }
    const updated = certification
      ? profile.certifications.map((c) => (c.id === certification.id ? newCert : c))
      : [...profile.certifications, newCert]
    updateProfile(userId, { certifications: updated })
    form.reset()
    onOpenChange(false)
    toast.success(certification ? 'Certification updated' : 'Certification added')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{certification ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
          <DialogDescription>Add certification details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='name' render={({ field }) => (
              <FormItem>
                <FormLabel>Certification Name *</FormLabel>
                <FormControl><Input placeholder='ServiceNow Certified System Administrator' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='issuer' render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer</FormLabel>
                <FormControl><Input placeholder='ServiceNow' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='issueDate' render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl><Input placeholder='MM/YYYY' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type='submit'>{certification ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


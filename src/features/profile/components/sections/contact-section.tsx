import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { contactSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile } from '@/types/profile'
import { z } from 'zod'

type ContactForm = z.infer<typeof contactSchema>

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: profile.contact || {
      email: '',
      phone: '',
      website: '',
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: '',
    },
  })

  const onSubmit = (data: ContactForm) => {
    if (!userId) return
    updateProfile(userId, { contact: data })
    toast.success('Contact information updated')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Social Links</CardTitle>
        <CardDescription>Add your contact information and social media profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='email' render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type='email' placeholder='your@email.com' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='phone' render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder='+1 (555) 123-4567' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='website' render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl><Input placeholder='https://yourwebsite.com' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='linkedin' render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl><Input placeholder='https://linkedin.com/in/yourprofile' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='github' render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl><Input placeholder='https://github.com/yourusername' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='portfolio' render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl><Input placeholder='https://yourportfolio.com' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type='submit'>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


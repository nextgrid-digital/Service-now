// @ts-nocheck
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { workExperienceSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, WorkExperience } from '@/types/profile'

const experienceFormSchema = workExperienceSchema.omit({ id: true })

type ExperienceForm = z.infer<typeof experienceFormSchema>

interface ExperienceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience: WorkExperience | null
  profile: Profile
}

export function ExperienceDialog({
  open,
  onOpenChange,
  experience,
  profile,
}: ExperienceDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<ExperienceForm>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: experience
      ? {
          company: experience.company,
          position: experience.position,
          startDate: experience.startDate,
          endDate: experience.endDate || '',
          current: experience.current,
          description: experience.description || '',
          location: experience.location || '',
        }
      : {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          location: '',
        },
  })

  const onSubmit = (data: ExperienceForm) => {
    if (!userId) return

    const newExperience: WorkExperience = {
      id: experience?.id || crypto.randomUUID(),
      ...data,
      endDate: data.current ? undefined : data.endDate || undefined,
    }

    const updatedExperiences = experience
      ? profile.workExperience.map((exp) =>
          exp.id === experience.id ? newExperience : exp
        )
      : [...profile.workExperience, newExperience]

    updateProfile(userId, {
      workExperience: updatedExperiences,
    })

    form.reset()
    onOpenChange(false)
    toast.success(
      experience ? 'Experience updated' : 'Experience added'
    )
  }

  const current = form.watch('current')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {experience ? 'Edit Experience' : 'Add Experience'}
          </DialogTitle>
          <DialogDescription>
            Add your work experience details
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position *</FormLabel>
                  <FormControl>
                    <Input placeholder='Senior ServiceNow Developer' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company *</FormLabel>
                  <FormControl>
                    <Input placeholder='Company Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input placeholder='MM/YYYY' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='MM/YYYY'
                        disabled={current}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='current'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>I currently work here</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='City, State' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your responsibilities and achievements...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>
                {experience ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


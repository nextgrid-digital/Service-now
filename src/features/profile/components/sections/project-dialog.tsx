// @ts-nocheck
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { projectSchema } from '@/types/profile'
import { toast } from 'sonner'
import type { Profile, Project } from '@/types/profile'

const projectFormSchema = projectSchema.omit({ id: true })
type ProjectForm = z.infer<typeof projectFormSchema>

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  profile: Profile
}

export function ProjectDialog({ open, onOpenChange, project, profile }: ProjectDialogProps) {
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project || {
      name: '',
      description: '',
      url: '',
      startDate: '',
      endDate: '',
      current: false,
      collaborators: [],
      technologies: [],
    },
  })

  const onSubmit = (data: ProjectForm) => {
    if (!userId) return
    const newProject: Project = {
      id: project?.id || crypto.randomUUID(),
      ...data,
      url: data.url || undefined,
      description: data.description || undefined,
    }
    const updated = project
      ? profile.projects.map((p) => (p.id === project.id ? newProject : p))
      : [...profile.projects, newProject]
    updateProfile(userId, { projects: updated })
    form.reset()
    onOpenChange(false)
    toast.success(project ? 'Project updated' : 'Project added')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogDescription>Add project details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='name' render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name *</FormLabel>
                <FormControl><Input placeholder='Project Name' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='description' render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder='Project description' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='url' render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl><Input placeholder='https://...' {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type='submit'>{project ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


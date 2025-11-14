import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { ProjectDialog } from './project-dialog'
import type { Profile, Project } from '@/types/profile'

interface ProjectsSectionProps {
  profile: Profile
}

export function ProjectsSection({ profile }: ProjectsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditingProject(null)
    setDialogOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return
    updateProfile(userId, {
      projects: profile.projects.filter((p) => p.id !== id),
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add your projects and portfolio work</CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.projects.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No projects added yet. Click "Add Project" to showcase your work.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.projects.map((project) => (
                <div key={project.id} className='flex items-start justify-between rounded-lg border p-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{project.name}</h4>
                    {project.description && (
                      <p className='text-muted-foreground mt-1 text-sm'>{project.description}</p>
                    )}
                    {project.url && (
                      <a href={project.url} target='_blank' rel='noopener noreferrer' className='text-primary mt-1 text-sm hover:underline'>
                        View Project
                      </a>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => handleEdit(project)}>
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => handleDelete(project.id)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <ProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} project={editingProject} profile={profile} />
    </>
  )
}


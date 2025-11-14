import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { ExperienceDialog } from './experience-dialog'
import type { Profile, WorkExperience } from '@/types/profile'

interface ExperienceSectionProps {
  profile: Profile
}

export function ExperienceSection({ profile }: ExperienceSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditingExperience(null)
    setDialogOpen(true)
  }

  const handleEdit = (experience: WorkExperience) => {
    setEditingExperience(experience)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return

    updateProfile(userId, {
      workExperience: profile.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const formatDateRange = (exp: WorkExperience) => {
    const start = exp.startDate
    const end = exp.current ? 'Present' : exp.endDate || 'Present'
    return `${start} - ${end}`
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>
                Add your professional work experience
              </CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.workExperience.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No work experience added yet. Click "Add Experience" to get started.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.workExperience.map((exp) => (
                <div
                  key={exp.id}
                  className='flex items-start justify-between rounded-lg border p-4'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='font-semibold'>{exp.position}</h4>
                      {exp.current && (
                        <Badge variant='secondary' className='text-xs'>
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className='text-muted-foreground mt-1'>{exp.company}</p>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {formatDateRange(exp)}
                    </p>
                    {exp.location && (
                      <p className='text-muted-foreground mt-1 text-sm'>
                        {exp.location}
                      </p>
                    )}
                    {exp.description && (
                      <p className='text-muted-foreground mt-2 text-sm'>
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEdit(exp)}
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <ExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        experience={editingExperience}
        profile={profile}
      />
    </>
  )
}


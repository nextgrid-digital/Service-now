import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { EducationDialog } from './education-dialog'
import type { Profile, Education } from '@/types/profile'

interface EducationSectionProps {
  profile: Profile
}

export function EducationSection({ profile }: EducationSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditingEducation(null)
    setDialogOpen(true)
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return

    updateProfile(userId, {
      education: profile.education.filter((edu) => edu.id !== id),
    })
  }

  const formatDateRange = (edu: Education) => {
    const start = edu.startDate
    const end = edu.current ? 'Present' : edu.endDate || 'Present'
    return `${start} - ${end}`
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add your educational background
              </CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.education.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No education added yet. Click "Add Education" to get started.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className='flex items-start justify-between rounded-lg border p-4'
                >
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='font-semibold'>{edu.degree}</h4>
                      {edu.current && (
                        <Badge variant='secondary' className='text-xs'>
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className='text-muted-foreground mt-1'>{edu.institution}</p>
                    {edu.field && (
                      <p className='text-muted-foreground mt-1'>{edu.field}</p>
                    )}
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {formatDateRange(edu)}
                    </p>
                    {edu.description && (
                      <p className='text-muted-foreground mt-2 text-sm'>
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEdit(edu)}
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDelete(edu.id)}
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
      <EducationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        education={editingEducation}
        profile={profile}
      />
    </>
  )
}


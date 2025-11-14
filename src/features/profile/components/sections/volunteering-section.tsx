import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { VolunteeringDialog } from './volunteering-dialog'
import type { Profile, Volunteering } from '@/types/profile'

interface VolunteeringSectionProps {
  profile: Profile
}

export function VolunteeringSection({ profile }: VolunteeringSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Volunteering | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: Volunteering) => {
    setEditing(item)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return
    updateProfile(userId, {
      volunteering: profile.volunteering.filter((v) => v.id !== id),
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Volunteering</CardTitle>
              <CardDescription>Add your volunteering experience</CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.volunteering.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No volunteering experience added yet. Click "Add" to get started.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.volunteering.map((item) => (
                <div key={item.id} className='flex items-start justify-between rounded-lg border p-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{item.role}</h4>
                    <p className='text-muted-foreground mt-1'>{item.organization}</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => handleEdit(item)}>
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => handleDelete(item.id)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <VolunteeringDialog open={dialogOpen} onOpenChange={setDialogOpen} volunteering={editing} profile={profile} />
    </>
  )
}


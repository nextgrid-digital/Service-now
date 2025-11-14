import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { AwardDialog } from './award-dialog'
import type { Profile, Award } from '@/types/profile'

interface AwardsSectionProps {
  profile: Profile
}

export function AwardsSection({ profile }: AwardsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Award | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: Award) => {
    setEditing(item)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return
    updateProfile(userId, {
      awards: profile.awards.filter((a) => a.id !== id),
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Awards</CardTitle>
              <CardDescription>Add your awards and recognitions</CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Award
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.awards.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No awards added yet. Click "Add Award" to showcase your achievements.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.awards.map((item) => (
                <div key={item.id} className='flex items-start justify-between rounded-lg border p-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{item.title}</h4>
                    {item.issuer && <p className='text-muted-foreground mt-1'>{item.issuer}</p>}
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
      <AwardDialog open={dialogOpen} onOpenChange={setDialogOpen} award={editing} profile={profile} />
    </>
  )
}


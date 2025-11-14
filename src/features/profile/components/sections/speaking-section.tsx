import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { SpeakingDialog } from './speaking-dialog'
import type { Profile, Speaking } from '@/types/profile'

interface SpeakingSectionProps {
  profile: Profile
}

export function SpeakingSection({ profile }: SpeakingSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Speaking | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: Speaking) => {
    setEditing(item)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return
    updateProfile(userId, {
      speaking: profile.speaking.filter((s) => s.id !== id),
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Speaking Engagements</CardTitle>
              <CardDescription>Add your speaking engagements and presentations</CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.speaking.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No speaking engagements added yet. Click "Add" to get started.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.speaking.map((item) => (
                <div key={item.id} className='flex items-start justify-between rounded-lg border p-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{item.event}</h4>
                    {item.topic && <p className='text-muted-foreground mt-1'>{item.topic}</p>}
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
      <SpeakingDialog open={dialogOpen} onOpenChange={setDialogOpen} speaking={editing} profile={profile} />
    </>
  )
}


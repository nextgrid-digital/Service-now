import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { CertificationDialog } from './certification-dialog'
import type { Profile, Certification } from '@/types/profile'

interface CertificationsSectionProps {
  profile: Profile
}

export function CertificationsSection({ profile }: CertificationsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAdd = () => {
    setEditingCert(null)
    setDialogOpen(true)
  }

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!userId) return
    updateProfile(userId, {
      certifications: profile.certifications.filter((c) => c.id !== id),
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Add your professional certifications</CardDescription>
            </div>
            <Button onClick={handleAdd} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Certification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profile.certifications.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No certifications added yet. Click "Add Certification" to get started.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {profile.certifications.map((cert) => (
                <div key={cert.id} className='flex items-start justify-between rounded-lg border p-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold'>{cert.name}</h4>
                    {cert.issuer && <p className='text-muted-foreground mt-1'>{cert.issuer}</p>}
                    {cert.issueDate && <p className='text-muted-foreground mt-1 text-sm'>Issued: {cert.issueDate}</p>}
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => handleEdit(cert)}>
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' onClick={() => handleDelete(cert.id)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <CertificationDialog open={dialogOpen} onOpenChange={setDialogOpen} certification={editingCert} profile={profile} />
    </>
  )
}


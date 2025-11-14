import { useState } from 'react'
import { X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { toast } from 'sonner'
import type { Profile } from '@/types/profile'

interface SkillsSectionProps {
  profile: Profile
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  const [skillInput, setSkillInput] = useState('')
  const { auth } = useAuthStore()
  const { updateProfile } = useProfileStore()
  const userId = auth.user?.userId

  const handleAddSkill = () => {
    if (!userId || !skillInput.trim()) return

    const trimmedSkill = skillInput.trim()
    if (profile.skills.includes(trimmedSkill)) {
      toast.error('Skill already exists')
      return
    }

    updateProfile(userId, {
      skills: [...profile.skills, trimmedSkill],
    })
    setSkillInput('')
    toast.success('Skill added')
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!userId) return

    updateProfile(userId, {
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    })
    toast.success('Skill removed')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your technical and professional skills
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex gap-2'>
          <Input
            placeholder='Enter a skill (e.g., ServiceNow, JavaScript)'
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddSkill()
              }
            }}
          />
          <Button onClick={handleAddSkill} disabled={!skillInput.trim()}>Add</Button>
        </div>
        {profile.skills.length === 0 ? (
          <p className='text-muted-foreground text-center py-4 text-sm'>
            No skills added yet. Enter a skill above and click "Add" to get started.
          </p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {profile.skills.map((skill) => (
              <Badge key={skill} variant='secondary' className='gap-1'>
                {skill}
                <button
                  type='button'
                  onClick={() => handleRemoveSkill(skill)}
                  className='ml-1 rounded-full hover:bg-secondary-foreground/20'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


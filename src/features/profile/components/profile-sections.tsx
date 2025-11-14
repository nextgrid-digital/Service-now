import { User, Briefcase, GraduationCap, Code, FolderOpen, Award, Heart, Trophy, Mic, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ProfileSectionsProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'volunteering', label: 'Volunteering', icon: Heart },
  { id: 'awards', label: 'Awards', icon: Trophy },
  { id: 'speaking', label: 'Speaking', icon: Mic },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export function ProfileSections({
  activeSection,
  onSectionChange,
}: ProfileSectionsProps) {
  return (
    <div className='space-y-1'>
      {sections.map((section) => {
        const Icon = section.icon
        return (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start',
              activeSection === section.id && 'bg-secondary'
            )}
            onClick={() => onSectionChange(section.id)}
          >
            <Icon className='mr-2 h-4 w-4' />
            {section.label}
          </Button>
        )
      })}
    </div>
  )
}


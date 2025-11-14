import { useState } from 'react'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/stores/auth-store'
import { useProfileStore } from '@/stores/profile-store'
import { ProfileSections } from './profile-sections'
import { ProfilePreview } from './profile-preview'
import { AboutSection } from './sections/about-section'
import { ExperienceSection } from './sections/experience-section'
import { EducationSection } from './sections/education-section'
import { SkillsSection } from './sections/skills-section'
import { ProjectsSection } from './sections/projects-section'
import { CertificationsSection } from './sections/certifications-section'
import { VolunteeringSection } from './sections/volunteering-section'
import { AwardsSection } from './sections/awards-section'
import { SpeakingSection } from './sections/speaking-section'
import { ContactSection } from './sections/contact-section'

export function ProfileBuilderContent() {
  const [activeSection, setActiveSection] = useState('about')
  const [showPreview, setShowPreview] = useState(false)
  const { auth } = useAuthStore()
  const { getProfile } = useProfileStore()
  const userId = auth.user?.userId

  if (!userId) return null

  const profile = getProfile(userId)

  if (!profile) return null

  if (showPreview) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Profile Preview</h2>
          <Button
            variant='outline'
            onClick={() => setShowPreview(false)}
          >
            Back to Edit
          </Button>
        </div>
        <ProfilePreview profile={profile} />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 lg:flex-row lg:gap-6'>
      {/* Sidebar Navigation */}
      <div className='hidden w-full shrink-0 lg:block lg:w-64'>
        <ProfileSections
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Main Content */}
      <div className='flex-1 min-w-0'>
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Tabs
            value={activeSection}
            onValueChange={setActiveSection}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2 gap-1 sm:flex sm:flex-wrap lg:hidden'>
              <TabsTrigger value='about' className='text-xs sm:text-sm'>About</TabsTrigger>
              <TabsTrigger value='experience' className='text-xs sm:text-sm'>Experience</TabsTrigger>
              <TabsTrigger value='education' className='text-xs sm:text-sm'>Education</TabsTrigger>
              <TabsTrigger value='skills' className='text-xs sm:text-sm'>Skills</TabsTrigger>
              <TabsTrigger value='projects' className='text-xs sm:text-sm'>Projects</TabsTrigger>
              <TabsTrigger value='certifications' className='text-xs sm:text-sm'>Certifications</TabsTrigger>
              <TabsTrigger value='volunteering' className='text-xs sm:text-sm'>Volunteering</TabsTrigger>
              <TabsTrigger value='awards' className='text-xs sm:text-sm'>Awards</TabsTrigger>
              <TabsTrigger value='speaking' className='text-xs sm:text-sm'>Speaking</TabsTrigger>
              <TabsTrigger value='contact' className='text-xs sm:text-sm'>Contact</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant='outline'
            onClick={() => setShowPreview(true)}
            className='gap-2 w-full sm:w-auto'
          >
            <Eye className='h-4 w-4' />
            Preview
          </Button>
        </div>

        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsContent value='about' className='mt-0'>
            <AboutSection profile={profile} />
          </TabsContent>
          <TabsContent value='experience' className='mt-0'>
            <ExperienceSection profile={profile} />
          </TabsContent>
          <TabsContent value='education' className='mt-0'>
            <EducationSection profile={profile} />
          </TabsContent>
          <TabsContent value='skills' className='mt-0'>
            <SkillsSection profile={profile} />
          </TabsContent>
          <TabsContent value='projects' className='mt-0'>
            <ProjectsSection profile={profile} />
          </TabsContent>
          <TabsContent value='certifications' className='mt-0'>
            <CertificationsSection profile={profile} />
          </TabsContent>
          <TabsContent value='volunteering' className='mt-0'>
            <VolunteeringSection profile={profile} />
          </TabsContent>
          <TabsContent value='awards' className='mt-0'>
            <AwardsSection profile={profile} />
          </TabsContent>
          <TabsContent value='speaking' className='mt-0'>
            <SpeakingSection profile={profile} />
          </TabsContent>
          <TabsContent value='contact' className='mt-0'>
            <ContactSection profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


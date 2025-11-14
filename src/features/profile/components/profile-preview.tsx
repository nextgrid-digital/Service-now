import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth-store'
import { useSupporterStore } from '@/stores/supporter-store'
import { SupporterBadge } from '@/components/supporter-badge'
import type { Profile } from '@/types/profile'
import { formatDistanceToNow } from 'date-fns'

interface ProfilePreviewProps {
  profile: Profile
}

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  const { auth } = useAuthStore()
  const { isSupporter } = useSupporterStore()
  const userId = auth.user?.userId
  const supporter = userId ? isSupporter(userId) : false

  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-2xl'>
                  {auth.user?.name || 'Your Name'}
                </CardTitle>
                {supporter && <SupporterBadge />}
              </div>
              {profile.contact?.email && (
                <p className='text-muted-foreground mt-1'>{profile.contact.email}</p>
              )}
              {profile.updatedAt && (
                <p className='text-muted-foreground mt-1 text-sm'>
                  Updated {formatDistanceToNow(profile.updatedAt, { addSuffix: true })}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        {profile.summary && (
          <CardContent>
            <p className='text-muted-foreground whitespace-pre-wrap'>{profile.summary}</p>
          </CardContent>
        )}
      </Card>

      {/* Work Experience */}
      {profile.workExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {profile.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='font-semibold'>{exp.position}</h4>
                    <p className='text-muted-foreground'>{exp.company}</p>
                    <p className='text-muted-foreground text-sm'>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </p>
                  </div>
                  {exp.current && <Badge variant='secondary'>Current</Badge>}
                </div>
                {exp.description && (
                  <p className='text-muted-foreground mt-2 text-sm'>{exp.description}</p>
                )}
                <Separator className='mt-4' />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {profile.education.map((edu) => (
              <div key={edu.id}>
                <h4 className='font-semibold'>{edu.degree}</h4>
                <p className='text-muted-foreground'>{edu.institution}</p>
                {edu.field && <p className='text-muted-foreground'>{edu.field}</p>}
                <Separator className='mt-4' />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-2'>
              {profile.skills.map((skill) => (
                <Badge key={skill} variant='secondary'>
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {profile.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {profile.projects.map((project) => (
              <div key={project.id}>
                <h4 className='font-semibold'>{project.name}</h4>
                {project.description && (
                  <p className='text-muted-foreground mt-1 text-sm'>{project.description}</p>
                )}
                {project.url && (
                  <a href={project.url} target='_blank' rel='noopener noreferrer' className='text-primary mt-1 text-sm hover:underline'>
                    View Project
                  </a>
                )}
                <Separator className='mt-4' />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {profile.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {profile.certifications.map((cert) => (
              <div key={cert.id}>
                <h4 className='font-semibold'>{cert.name}</h4>
                {cert.issuer && <p className='text-muted-foreground text-sm'>{cert.issuer}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Contact */}
      {profile.contact && (
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {profile.contact.linkedin && (
              <a href={profile.contact.linkedin} target='_blank' rel='noopener noreferrer' className='text-primary text-sm hover:underline'>
                LinkedIn
              </a>
            )}
            {profile.contact.github && (
              <a href={profile.contact.github} target='_blank' rel='noopener noreferrer' className='text-primary text-sm hover:underline'>
                GitHub
              </a>
            )}
            {profile.contact.website && (
              <a href={profile.contact.website} target='_blank' rel='noopener noreferrer' className='text-primary text-sm hover:underline'>
                Website
              </a>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}


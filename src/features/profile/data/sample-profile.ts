import type { Profile } from '@/types/profile'

export function generateSampleProfile(userId: string): Profile {
  return {
    userId,
    summary: `Experienced ServiceNow professional with over 8 years of expertise in platform administration, development, and implementation. 
    
Specialized in ITSM, ITOM, and custom application development. Proven track record of leading digital transformation initiatives and optimizing ServiceNow platforms for enterprise organizations.

Passionate about leveraging ServiceNow to drive business value and improve operational efficiency. Strong background in IT service management, process automation, and platform architecture.`,
    workExperience: [
      {
        id: 'exp-1',
        company: 'TechCorp Solutions',
        position: 'Senior ServiceNow Developer',
        startDate: '2020-01',
        endDate: '',
        current: true,
        location: 'San Francisco, CA',
        description: `Lead ServiceNow development initiatives for enterprise clients. Design and implement custom applications, integrations, and workflows.
        
• Developed 15+ custom ServiceNow applications for various business units
• Implemented ServiceNow integrations with Jira, Salesforce, and Azure DevOps
• Reduced incident resolution time by 40% through automation
• Mentored junior developers and conducted training sessions`,
      },
      {
        id: 'exp-2',
        company: 'Global IT Services',
        position: 'ServiceNow Administrator',
        startDate: '2017-06',
        endDate: '2019-12',
        current: false,
        location: 'New York, NY',
        description: `Managed and maintained ServiceNow platform for 5000+ users across multiple business units.
        
• Configured and maintained ITSM, ITOM, and ITBM modules
• Implemented CMDB best practices and data governance
• Created and maintained 50+ catalog items and workflows
• Achieved 99.9% platform uptime`,
      },
      {
        id: 'exp-3',
        company: 'Digital Innovations Inc.',
        position: 'ServiceNow Consultant',
        startDate: '2015-03',
        endDate: '2017-05',
        current: false,
        location: 'Austin, TX',
        description: `Provided ServiceNow consulting services to mid-size and enterprise clients.
        
• Led 8 ServiceNow implementation projects from discovery to go-live
• Configured ITSM processes including Incident, Problem, and Change Management
• Delivered training and knowledge transfer to client teams
• Achieved 100% client satisfaction rating`,
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2011-09',
        endDate: '2015-05',
        current: false,
        description: 'Graduated Magna Cum Laude. Relevant coursework: Software Engineering, Database Systems, Network Security.',
      },
      {
        id: 'edu-2',
        institution: 'ServiceNow University',
        degree: 'Certified System Administrator',
        field: 'ServiceNow Platform',
        startDate: '2016-01',
        endDate: '2016-03',
        current: false,
        description: 'Completed comprehensive ServiceNow administration training program.',
      },
    ],
    skills: [
      'ServiceNow Development',
      'JavaScript',
      'ITSM',
      'ITOM',
      'Service Portal',
      'Flow Designer',
      'Integration Hub',
      'REST APIs',
      'SOAP',
      'ITIL',
      'Agile',
      'Scrum',
      'Project Management',
      'SQL',
      'HTML/CSS',
      'AngularJS',
      'Git',
      'Jira',
      'Confluence',
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Enterprise Service Catalog Automation',
        description: `Designed and developed a comprehensive service catalog with automated fulfillment workflows. 
        
Reduced service request fulfillment time by 60% and improved user satisfaction scores.`,
        url: '',
        startDate: '2021-03',
        endDate: '2021-08',
        current: false,
        technologies: ['ServiceNow', 'JavaScript', 'Flow Designer', 'REST API'],
        collaborators: ['Team of 5 developers'],
      },
      {
        id: 'proj-2',
        name: 'CMDB Health Dashboard',
        description: `Created a custom application to monitor and maintain CMDB data quality. 
        
Implemented automated discovery patterns and data reconciliation workflows.`,
        url: '',
        startDate: '2020-06',
        endDate: '2020-12',
        current: false,
        technologies: ['ServiceNow', 'Discovery', 'CMDB', 'JavaScript'],
        collaborators: ['Infrastructure team'],
      },
      {
        id: 'proj-3',
        name: 'Mobile Service Portal',
        description: `Developed a responsive mobile service portal for field technicians. 
        
Enabled mobile incident creation and resolution, improving field service efficiency by 45%.`,
        url: '',
        startDate: '2019-01',
        endDate: '2019-06',
        current: false,
        technologies: ['ServiceNow', 'Service Portal', 'AngularJS', 'Mobile UI'],
        collaborators: ['UX Designer', '2 Frontend Developers'],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Certified System Administrator',
        issuer: 'ServiceNow',
        issueDate: '2016-03',
        expiryDate: '',
        credentialId: 'CSA-12345',
        credentialUrl: '',
      },
      {
        id: 'cert-2',
        name: 'Certified Application Developer',
        issuer: 'ServiceNow',
        issueDate: '2017-08',
        expiryDate: '',
        credentialId: 'CAD-67890',
        credentialUrl: '',
      },
      {
        id: 'cert-3',
        name: 'Certified Implementation Specialist - ITSM',
        issuer: 'ServiceNow',
        issueDate: '2018-05',
        expiryDate: '',
        credentialId: 'CIS-ITSM-11111',
        credentialUrl: '',
      },
      {
        id: 'cert-4',
        name: 'ITIL Foundation',
        issuer: 'AXELOS',
        issueDate: '2016-11',
        expiryDate: '',
        credentialId: 'ITIL-F-22222',
        credentialUrl: '',
      },
    ],
    volunteering: [
      {
        id: 'vol-1',
        organization: 'ServiceNow Community',
        role: 'Mentor',
        startDate: '2019-01',
        endDate: '',
        current: true,
        description: 'Mentor aspiring ServiceNow professionals and help them prepare for certifications.',
      },
      {
        id: 'vol-2',
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        startDate: '2018-06',
        endDate: '2020-12',
        current: false,
        description: 'Developed ServiceNow solutions for non-profit organizations pro bono.',
      },
    ],
    awards: [
      {
        id: 'award-1',
        title: 'ServiceNow Innovation Award',
        issuer: 'TechCorp Solutions',
        date: '2022-12',
        description: 'Recognized for outstanding contribution to ServiceNow platform innovation and automation initiatives.',
      },
      {
        id: 'award-2',
        title: 'Employee of the Year',
        issuer: 'Global IT Services',
        date: '2019-12',
        description: 'Awarded for exceptional performance and leadership in ServiceNow platform management.',
      },
    ],
    speaking: [
      {
        id: 'speak-1',
        event: 'ServiceNow Knowledge 2023',
        topic: 'Advanced ServiceNow Automation Techniques',
        date: '2023-05',
        location: 'Las Vegas, NV',
        description: 'Presented best practices for implementing complex automation workflows in ServiceNow.',
        url: '',
      },
      {
        id: 'speak-2',
        event: 'ITSM Summit 2022',
        topic: 'Modernizing IT Service Management with ServiceNow',
        date: '2022-10',
        location: 'Chicago, IL',
        description: 'Shared insights on digital transformation and ITSM best practices.',
        url: '',
      },
    ],
    contact: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      portfolio: 'https://johndoe.dev/portfolio',
    },
  }
}


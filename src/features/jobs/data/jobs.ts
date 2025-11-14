import { faker } from '@faker-js/faker'
import type { Job } from '@/types/job'
import { companies } from './companies'

faker.seed(67890)

const jobTitles = [
  'ServiceNow Developer',
  'ServiceNow Administrator',
  'ServiceNow Architect',
  'ServiceNow Consultant',
  'ServiceNow Implementation Specialist',
  'ServiceNow Platform Engineer',
  'ServiceNow ITSM Specialist',
  'ServiceNow ITOM Engineer',
  'ServiceNow Integration Developer',
  'ServiceNow Business Analyst',
  'ServiceNow Technical Lead',
  'ServiceNow Solution Architect',
  'ServiceNow Senior Developer',
  'ServiceNow Project Manager',
  'ServiceNow Security Specialist',
]

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Seattle, WA',
  'Chicago, IL',
  'Boston, MA',
  'Denver, CO',
  'Remote',
  'Hybrid - New York, NY',
  'Hybrid - San Francisco, CA',
]

const salaryRanges = [
  '$80,000 - $120,000',
  '$100,000 - $150,000',
  '$120,000 - $180,000',
  '$150,000 - $200,000',
  '$180,000 - $250,000',
  'Competitive',
  'Based on experience',
]

const overviewTemplates = [
  `We're looking for a talented {{title}} to help us optimize our ServiceNow platform. You'll work on customizations, integrations, and platform enhancements across global teams while mentoring junior developers.`,
  `Join our growing ServiceNow Center of Excellence as a {{title}}. You'll translate stakeholder requirements into scalable ServiceNow solutions and drive platform innovation.`,
  `As a {{title}}, you will partner with product owners and cross-functional teams to design, build, and launch ServiceNow capabilities that improve business operations.`,
  `We're hiring a {{title}} who is passionate about ServiceNow and eager to own complex implementations, streamline processes, and deliver measurable value.`,
]

const responsibilitiesTemplates: string[][] = [
  [
    'Design, develop, and deploy ServiceNow solutions across ITSM, ITOM, and HRSD modules.',
    'Collaborate with stakeholders to capture requirements and translate them into technical designs.',
    'Build custom applications, integrations, and automations using Flow Designer and Integration Hub.',
    'Maintain platform health, optimize performance, and ensure alignment with best practices.',
    'Create and maintain technical documentation, runbooks, and knowledge base articles.',
  ],
  [
    'Own end-to-end ServiceNow implementation projects from discovery through hypercare.',
    'Configure catalog items, workflows, and business rules to support enterprise processes.',
    'Integrate ServiceNow with third-party systems using REST/SOAP APIs and MID server.',
    'Work with QA teams to define test plans, automate regression testing, and remediate defects.',
    'Mentor junior team members and champion ServiceNow standards across the organization.',
  ],
  [
    'Partner with product owners to define the roadmap and prioritize ServiceNow backlog items.',
    'Develop Service Portal experiences that deliver intuitive user journeys and responsive UIs.',
    'Implement data governance practices to keep the CMDB accurate and actionable.',
    'Monitor platform usage, analyze KPIs, and recommend enhancements that deliver ROI.',
    'Ensure compliance with security policies, access controls, and change management processes.',
  ],
]

const requirementsTemplates: string[][] = [
  [
    '5+ years of hands-on ServiceNow development and administration experience.',
    'Certified System Administrator (CSA) and at least one ServiceNow implementation certification.',
    'Strong proficiency in JavaScript, Service Portal, Flow Designer, and Integration Hub.',
    'Experience integrating ServiceNow with enterprise systems using APIs and middleware.',
    'Excellent communication skills and ability to work with technical and non-technical stakeholders.',
  ],
  [
    'Bachelor’s degree in Computer Science, Information Systems, or related field.',
    'Deep understanding of ITIL/ITSM processes and how they map to ServiceNow capabilities.',
    'Proven track record delivering complex ServiceNow projects in agile environments.',
    'Ability to write clean, maintainable code and follow ServiceNow development best practices.',
    'Comfortable working in a fast-paced environment with shifting priorities and tight deadlines.',
  ],
]

const benefitSamples = [
  [
    'Flexible hybrid work schedule with quarterly team meetups.',
    'Annual learning stipend and full access to ServiceNow training catalog.',
    'Comprehensive health, dental, and vision coverage from day one.',
    '401(k) with employer match and annual performance bonus.',
  ],
  [
    'Generous PTO, mental health days, and volunteer time off.',
    'Hardware allowance and modern collaboration tools.',
    'Dedicated career coach and mentorship program.',
  ],
]

function getRandom<T>(array: T[]): T {
  return faker.helpers.arrayElement(array)
}

function generateJobContent(title: string) {
  const overviewTemplate = getRandom(overviewTemplates)
  const overview = overviewTemplate.replace('{{title}}', title)
  const responsibilities = getRandom(responsibilitiesTemplates)
  const requirements = getRandom(requirementsTemplates)
  const benefits = getRandom(benefitSamples)

  return { overview, responsibilities, requirements, benefits }
}

function buildJobDescription(overview: string): string {
  const secondaryParagraph =
    "You'll collaborate with product owners, platform engineers, and business stakeholders to deliver scalable ServiceNow capabilities. This role combines hands-on development with strategic planning, giving you the opportunity to shape the future of our enterprise platform."
  const tertiaryParagraph =
    'We foster a culture of experimentation, continuous learning, and work-life balance. You will have access to mentorship, certification support, and a community of ServiceNow experts who are passionate about solving complex problems that matter.'

  return `${overview}

${secondaryParagraph}

${tertiaryParagraph}`
}

export function generateSampleJobs(count: number = 20): Job[] {
  const jobs: Job[] = []
  const jobTypes: Job['type'][] = [
    'full-time',
    'part-time',
    'contract',
    'freelance',
    'internship',
  ]

  for (let i = 0; i < count; i++) {
    const company = faker.helpers.arrayElement(companies)
    const title = faker.helpers.arrayElement(jobTitles)
    const createdAt = faker.date.past({ years: 1 })
    const jobContent = generateJobContent(title)
    const { overview, responsibilities, requirements, benefits } = jobContent

    jobs.push({
      id: `job-${i + 1}`,
      title,
      company: company.name,
      location: faker.helpers.arrayElement(locations),
      salary: faker.helpers.arrayElement(salaryRanges),
      type: faker.helpers.arrayElement(jobTypes),
      description: buildJobDescription(overview),
      overview,
      responsibilities,
      requirements,
      benefits,
      postedBy: company.id,
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    })
  }

  return jobs
}

// Generate initial sample jobs
export const sampleJobs = generateSampleJobs(25)


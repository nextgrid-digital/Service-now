import { faker } from '@faker-js/faker'

faker.seed(12345)

export interface Company {
  id: string
  name: string
  description?: string
  location?: string
  website?: string
}

export const companies: Company[] = [
  {
    id: 'company-1',
    name: 'ServiceNow Solutions Inc.',
    description: 'Leading ServiceNow implementation and consulting firm',
    location: 'San Francisco, CA',
    website: 'https://servicenow-solutions.example.com',
  },
  {
    id: 'company-2',
    name: 'CloudTech Services',
    description: 'Enterprise ServiceNow platform management',
    location: 'New York, NY',
    website: 'https://cloudtech.example.com',
  },
  {
    id: 'company-3',
    name: 'Digital Transformation Partners',
    description: 'ServiceNow development and customization experts',
    location: 'Austin, TX',
    website: 'https://dtp.example.com',
  },
  {
    id: 'company-4',
    name: 'Enterprise IT Solutions',
    description: 'ServiceNow ITSM and ITOM specialists',
    location: 'Seattle, WA',
    website: 'https://enterprise-it.example.com',
  },
  {
    id: 'company-5',
    name: 'NextGen IT Consulting',
    description: 'ServiceNow platform optimization and support',
    location: 'Chicago, IL',
    website: 'https://nextgen-it.example.com',
  },
]


import type { User } from '@/types/user'

export const sampleUsers: User[] = [
  // Job Seekers
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    userType: 'job_seeker',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    userType: 'job_seeker',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'user-3',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    userType: 'job_seeker',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'user-4',
    email: 'sarah.williams@example.com',
    name: 'Sarah Williams',
    userType: 'job_seeker',
    createdAt: new Date('2024-02-20'),
  },
  // Companies
  {
    id: 'company-1',
    email: 'hr@servicenow-solutions.example.com',
    name: 'ServiceNow Solutions Inc.',
    userType: 'company',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'company-2',
    email: 'careers@cloudtech.example.com',
    name: 'CloudTech Services',
    userType: 'company',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: 'company-3',
    email: 'admin@dtp.example.com',
    name: 'Digital Transformation Partners',
    userType: 'company',
    createdAt: new Date('2024-01-10'),
  },
  // Admin
  {
    id: 'admin-1',
    email: 'admin@servicenow-jobs.example.com',
    name: 'Platform Admin',
    userType: 'admin',
    createdAt: new Date('2024-01-01'),
  },
]

// Helper function to get user by email
export function getUserByEmail(email: string): User | undefined {
  return sampleUsers.find((user) => user.email === email)
}

// Helper function to get user by id
export function getUserById(id: string): User | undefined {
  return sampleUsers.find((user) => user.id === id)
}


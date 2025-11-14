import { Search, MapPin, Filter, ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'company-asc'
  | 'company-desc'
  | 'salary-desc'
  | 'salary-asc'

interface JobsFilterProps {
  searchQuery: string
  locationFilter: string
  typeFilter: string
  sortBy: SortOption
  onSearchChange: (value: string) => void
  onLocationChange: (value: string) => void
  onTypeChange: (value: string) => void
  onSortChange: (value: SortOption) => void
}

export function JobsFilter({
  searchQuery,
  locationFilter,
  typeFilter,
  sortBy,
  onSearchChange,
  onLocationChange,
  onTypeChange,
  onSortChange,
}: JobsFilterProps) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
      <div className='relative flex-1'>
        <Search className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
        <Input
          placeholder='Search jobs, companies...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='pl-9'
        />
      </div>
      <div className='relative flex-1'>
        <MapPin className='text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2' />
        <Input
          placeholder='Location'
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
          className='pl-9'
        />
      </div>
      <Select value={typeFilter || undefined} onValueChange={(value) => onTypeChange(value || '')}>
        <SelectTrigger className='w-full sm:w-[180px]'>
          <Filter className='mr-2 h-4 w-4 shrink-0' />
          <SelectValue placeholder='Job Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Types</SelectItem>
          <SelectItem value='full-time'>Full Time</SelectItem>
          <SelectItem value='part-time'>Part Time</SelectItem>
          <SelectItem value='contract'>Contract</SelectItem>
          <SelectItem value='freelance'>Freelance</SelectItem>
          <SelectItem value='internship'>Internship</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className='w-full sm:w-[200px]'>
          <ArrowUpDown className='mr-2 h-4 w-4 shrink-0' />
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='date-desc'>Date (Newest First)</SelectItem>
          <SelectItem value='date-asc'>Date (Oldest First)</SelectItem>
          <SelectItem value='title-asc'>Title (A-Z)</SelectItem>
          <SelectItem value='title-desc'>Title (Z-A)</SelectItem>
          <SelectItem value='company-asc'>Company (A-Z)</SelectItem>
          <SelectItem value='company-desc'>Company (Z-A)</SelectItem>
          <SelectItem value='salary-desc'>Salary (High to Low)</SelectItem>
          <SelectItem value='salary-asc'>Salary (Low to High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}


import { Link } from '@tanstack/react-router'

export function AppTitle() {
  return (
    <Link
      to='/'
      className='inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary'
    >
      <span className='grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold'>
        SN
      </span>
      <span className='tracking-tight'>ServiceNow Jobs</span>
    </Link>
  )
}

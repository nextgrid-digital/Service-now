import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AuthModalButtons } from '@/components/auth-modal'

export function ProfileDropdown() {
  return (
    <div className='flex items-center gap-2'>
      <SignedIn>
        <UserButton afterSignOutUrl='/' />
      </SignedIn>
      <SignedOut>
        <AuthModalButtons />
      </SignedOut>
    </div>
  )
}

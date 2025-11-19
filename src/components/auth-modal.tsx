import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AuthModalButtonsProps = {
  className?: string
}

export function AuthModalButtons({ className }: AuthModalButtonsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <SignInButton mode='modal'>
        <Button variant='outline' size='sm'>
          Sign in
        </Button>
      </SignInButton>
      <SignUpButton mode='modal'>
        <Button size='sm'>Sign up</Button>
      </SignUpButton>
    </div>
  )
}


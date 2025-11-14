import { useState } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth-store'
import { useSupporterStore } from '@/stores/supporter-store'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'

interface SupporterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupporterModal({ open, onOpenChange }: SupporterModalProps) {
  const [amount, setAmount] = useState('49')
  const [isProcessing, setIsProcessing] = useState(false)
  const { auth } = useAuthStore()
  const { setSupporter } = useSupporterStore()
  const userId = auth.user?.userId

  const handlePayment = async () => {
    if (!userId) {
      toast.error('Please sign in to become a supporter')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum < 1) {
      toast.error('Please enter a valid amount (minimum $1.00)')
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    toast.promise(sleep(2000), {
      loading: 'Processing payment...',
      success: () => {
        setIsProcessing(false)
        setSupporter(userId, amountNum)
        onOpenChange(false)
        setAmount('49') // Reset amount
        toast.success('Thank you for your support!')
        return 'Payment successful!'
      },
      error: 'Payment failed. Please try again.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Heart className='h-5 w-5 text-primary' />
            Become a Supporter
          </DialogTitle>
          <DialogDescription>
            Support the ServiceNow job platform and receive a special badge on your profile
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='amount'>Support Amount (USD)</Label>
            <div className='relative'>
              <span className='text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2'>
                $
              </span>
              <Input
                id='amount'
                type='number'
                min='1'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='pl-7'
                placeholder='49'
              />
            </div>
            <p className='text-muted-foreground text-xs'>
              Minimum: $1.00 USD
            </p>
          </div>
          <div className='rounded-lg border bg-muted/50 p-4'>
            <p className='text-sm font-medium'>What you get:</p>
            <ul className='text-muted-foreground mt-2 space-y-1 text-sm'>
              <li>• Supporter badge on your profile</li>
              <li>• Featured in supporters list</li>
              <li>• Help grow the ServiceNow community</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Processing...
              </>
            ) : (
              <>
                <Heart className='mr-2 h-4 w-4' />
                Support Now
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


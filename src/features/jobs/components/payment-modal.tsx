import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  amount: number
}

export function PaymentModal({
  open,
  onOpenChange,
  onSuccess,
  amount,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    toast.promise(sleep(2000), {
      loading: 'Processing payment...',
      success: () => {
        setIsProcessing(false)
        onSuccess()
        onOpenChange(false)
        return 'Payment successful!'
      },
      error: 'Payment failed. Please try again.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
          <DialogDescription>
            Complete your payment to post the job
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='rounded-lg border bg-muted/50 p-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Job Posting Fee</span>
              <span className='text-lg font-semibold'>${amount} USD</span>
            </div>
          </div>
          <p className='text-muted-foreground text-xs'>
            This is a prototype. No actual payment will be processed.
          </p>
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
              `Pay $${amount}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


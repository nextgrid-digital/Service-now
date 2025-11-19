import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/stores/auth-store'
import { useJobsStore } from '@/stores/jobs-store'
import { PaymentModal } from './payment-modal'
import { createJobSchema } from '@/types/job'
import { toast } from 'sonner'

const postJobFormSchema = createJobSchema

type PostJobForm = z.infer<typeof postJobFormSchema>

export function PostJobForm() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const { addJob } = useJobsStore()
  const userId = auth.user?.userId

  const form = useForm<PostJobForm>({
    resolver: zodResolver(postJobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      salary: '',
      type: 'full-time',
      description: '',
      postedBy: userId || '',
    },
  })

  const onSubmit = (_data: PostJobForm) => {
    if (!userId) {
      toast.error('Please sign in to post a job')
      return
    }

    // Show payment modal
    setPaymentModalOpen(true)
  }

  const handlePaymentSuccess = async () => {
    const formData = form.getValues()
    await addJob({
      ...formData,
      postedBy: userId!,
    })

    form.reset()
    toast.success('Job posted successfully!')
    navigate({ to: '/jobs/my-jobs' })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Fill in the details for your ServiceNow job posting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder='ServiceNow Developer' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder='Your Company' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='City, State or Remote' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='salary'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input placeholder='$80,000 - $120,000' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select job type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='full-time'>Full Time</SelectItem>
                        <SelectItem value='part-time'>Part Time</SelectItem>
                        <SelectItem value='contract'>Contract</SelectItem>
                        <SelectItem value='freelance'>Freelance</SelectItem>
                        <SelectItem value='internship'>Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe the job requirements, responsibilities, and qualifications...'
                        className='min-h-[200px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between pt-4'>
                <p className='text-muted-foreground text-sm'>
                  Posting fee: <span className='font-semibold'>$49 USD</span>
                </p>
                <Button type='submit'>Continue to Payment</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        amount={49}
      />
    </>
  )
}


'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChanelType } from '@prisma/client'
import { SelectContent, SelectValue } from '@radix-ui/react-select'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { GlobalModalsContext } from '@/shared/lib/context/global-modals-context'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Select, SelectItem, SelectTrigger } from '@/shared/ui/select'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required',
    })
    .refine((name) => name !== 'general', {
      message: `Channel name cannot be 'general'`,
    }),
  type: z.nativeEnum(ChanelType),
})

type FormSchema = z.infer<typeof formSchema>

export const CreateChannelModal = () => {
  const { isOpen, onOpen, onClose, type, data } =
    useContext(GlobalModalsContext)
  const router = useRouter()
  const params = useParams()

  const isModalOpen = isOpen && type === 'createChannel'
  const { server } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: ChanelType.TEXT,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      })
      await axios.post(url, values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>

                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.values(ChanelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={'primary'} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

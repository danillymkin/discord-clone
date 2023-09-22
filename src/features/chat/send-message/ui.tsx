'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Smile } from 'lucide-react'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'channel'
  leftSlot?: React.ReactNode
}

const formSchema = z.object({
  content: z.string().min(1),
})

type FormSchemaType = z.infer<typeof formSchema>

export const ChatInput = ({
  apiUrl,
  query,
  name,
  type,
  leftSlot,
}: ChatInputProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, values)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  {leftSlot}

                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  />

                  <div className="absolute top-7 right-8">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
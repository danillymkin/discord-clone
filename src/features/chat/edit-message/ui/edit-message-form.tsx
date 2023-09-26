'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import qs from 'query-string'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/shared/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

import { useEditMessage } from '../model/use-edit-message'

const formSchema = z.object({
  content: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>

interface EditMessageFormProps {
  messageId: string
  content: string
  socketUrl: string
  socketQuery: Record<string, string>
}

export const EditMessageForm = ({
  content,
  messageId,
  socketUrl,
  socketQuery,
}: EditMessageFormProps) => {
  const { setIsEditing } = useEditMessage()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  })

  useEffect(() => {
    form.reset({
      content,
    })
  }, [content, form])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${messageId}`,
        query: socketQuery,
      })

      await axios.patch(url, values)
      form.reset()
      setIsEditing(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-full gap-x-2 pt-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    disabled={isLoading}
                    className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder="Edited message"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button size="sm" variant="primary" disabled={isLoading}>
          Save
        </Button>
      </form>

      <span className="text-[10px] mt-1 text-zinc-400">
        Press escape to cancel
      </span>
    </Form>
  )
}

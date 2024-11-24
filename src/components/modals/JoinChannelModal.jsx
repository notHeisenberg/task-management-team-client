"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import PropTypes from 'prop-types'

const formSchema = z.object({
  channelCode: z.string().min(1, {
    message: "Channel code is required.",
  }),
})

const JoinChannelModal = ({ isOpen, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelCode: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // Handle join channel logic here, e.g., submit to database
    form.reset()
    onClose()
  }

  const handleCancel = () => {
    form.reset()
    form.clearErrors()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Channel</DialogTitle>
          <DialogDescription>
            Enter the channel code to join an existing channel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="channelCode"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Channel Code</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Channel code..." {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button type="submit">Join</Button>
                </FormItem>
              )}
            />
            <DialogFooter>
              
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

JoinChannelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default JoinChannelModal
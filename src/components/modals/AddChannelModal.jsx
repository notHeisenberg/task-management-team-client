"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PropTypes from "prop-types"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  channelName: z.string().min(2, {
    message: "Channel name must be at least 2 characters.",
  }),
  section: z.string().min(1, {
    message: "Section is required.",
  }),
  courseID: z.string().min(1, {
    message: "Course ID is required.",
  }),
  roomID: z.string().optional(),
})

const AddChannelModal = ({ isOpen, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelName: "",
      section: "",
      courseID: "",
      roomID: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    // Handle add channel logic here
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
          <DialogTitle>Add Channel</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new channel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="channelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Channel Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="Section" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Course ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room ID (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Room ID (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className={'flex gap-2'}>
              <Button type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Add Channel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
AddChannelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddChannelModal
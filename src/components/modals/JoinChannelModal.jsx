"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import PropTypes from 'prop-types'
import useAuth from "@/hooks/useAuth"
import { axiosCommon } from "@/hooks/useAxiosCommon"
import { useToast } from "@/hooks/use-toast"
import { useContext } from "react"
import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext"

const formSchema = z.object({
  channelCode: z.string().min(1, {
    message: "Channel code is required.",
  }),
})

const JoinChannelModal = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const { refetch } = useContext(DashboardContext)
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channelCode: "",
    },
  })

  const onSubmit = async (data) => {
    console.log(data.channelCode)

    const updatechannelData = {
      channelCode: data.channelCode,
      students: { name: user?.displayName, email: user?.email, image: user?.photoURL },
    }
    // console.log(updatechannelData)

    // Handle join channel logic here, e.g., submit to database
    try {
      const res = await axiosCommon.patch("/channel", updatechannelData)
      if (res.status === 201) {
        toast({
          variant: "outline",
          title: "Success",
          description: "Join successfully",
        })
      } else if (res.status === 400) {
        console.log(res.data)
        toast({
          variant: "disruptive",
          title: "Joined",
          description: "You are already joined",
        })
      }
      form.reset()
      onClose()
    } catch {
      toast({
        varient: "destructive",
        title: "Error",
        description: "Error joining channel",
      })
    } finally {
      refetch()
    }
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
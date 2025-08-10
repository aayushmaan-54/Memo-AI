"use client";
import { notesFormSchema } from "@/schema/notes.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import toast from "react-hot-toast";



export default function NoteDialog(
  { isDialogOpen, setIsDialogOpen }:
    { isDialogOpen: boolean, setIsDialogOpen: (isDialogOpen: boolean) => void }
) {
  const createNote = useAction(api.notesActions.createNote);

  const form = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const isCreatingNote = form.formState.isSubmitting;


  async function onSubmit(values: z.infer<typeof notesFormSchema>) {
    try {
      await createNote({
        title: values.title,
        content: values.content,
      });

      toast.success("Note created successfully!");
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating note: ", error);
      toast.error("Error creating note, try again later!");
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Fill in the details for your new note. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note body" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isCreatingNote}>
                  { isCreatingNote ? "Saving..." : "Save" }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

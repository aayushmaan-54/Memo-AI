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
import { Doc } from "../../../../convex/_generated/dataModel";
import { useEffect, useState } from "react";

interface EditNoteDialogProps {
  note: Doc<"notes">;
  isOpen: boolean;
  onClose: () => void;
}



export default function EditNoteDialog({ note, isOpen, onClose }: EditNoteDialogProps) {
  const updateNote = useAction(api.notesActions.updateNote);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: note.title,
        content: note.content,
      });
    }
  }, [note, form, isOpen]);

  const isUpdatingNote = form.formState.isSubmitting || isLoading;


  async function onSubmit(values: z.infer<typeof notesFormSchema>) {
    if (values.title === note.title && values.content === note.content) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      await updateNote({
        noteId: note._id,
        title: values.title,
        content: values.content,
      });

      toast.success("Note updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating note: ", error);
      toast.error("Error updating note, try again later!");
    } finally {
      setIsLoading(false);
    }
  }


  function handleClose() {
    if (isUpdatingNote) return;
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Make changes to your note. Click update when you&apos;re done.
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
              <Button type="button" variant="outline" onClick={handleClose} disabled={isUpdatingNote}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdatingNote}>
                {isUpdatingNote ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

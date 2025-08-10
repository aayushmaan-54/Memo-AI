import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Edit } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import toast from "react-hot-toast";
import EditNoteDialog from "./edit-note-dialog";



export default function NotePreviewDialog({ note }: { note: Doc<"notes"> }) {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("noteId") === note._id;

  const deleteNote = useMutation(api.notes.deleteNote);
  const [isDeletingNote, setIsDeletingNote] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function handleNoteClose() {
    if (isDeletingNote) return;
    window.history.pushState(null, "", window.location.pathname);
  }


  const deleteNoteHandler = async () => {
    setIsDeletingNote(true);
    try {
      await deleteNote({ noteId: note._id });
      toast.success("Note deleted successfully!");
      handleNoteClose();
    } catch (error) {
      console.error("Error Deleting Note: ", error);
      toast.error("Error Deleting Note, Try again later!");
    } finally {
      setIsDeletingNote(false);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleNoteClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{note.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-wrap">{note.content}</div>
          <DialogFooter className="mt-6 gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit size={16} />
              Edit Note
            </Button>
            <Button
              variant="destructive"
              className="gap-2"
              disabled={isDeletingNote}
              onClick={deleteNoteHandler}
            >
              <Trash2 size={16} />
              {isDeletingNote ? "Deleting..." : "Delete Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditNoteDialog
        note={note}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}

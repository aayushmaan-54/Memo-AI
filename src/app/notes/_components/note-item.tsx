"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import NotePreviewDialog from "./note-preview-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import EditNoteDialog from "./edit-note-dialog";



export default function NoteItem({ note }: { note: Doc<"notes"> }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function handleOpenNote() {
    window.history.pushState(null, "", `?noteId=${note._id}`);
  }

  function handleEditClick(e: React.MouseEvent) {
    e.stopPropagation();
    setIsEditDialogOpen(true);
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow border-border relative group" onClick={handleOpenNote}>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleEditClick}
            className="h-8 w-8 p-0"
          >
            <Edit size={14} />
          </Button>
        </div>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-3 text-sm text-muted-foreground whitespace-pre-line mb-2">
            {note.content}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {formatDate(note.updatedAt)}
          </div>
        </CardContent>
      </Card>

      <NotePreviewDialog note={note} />

      <EditNoteDialog
        note={note}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}

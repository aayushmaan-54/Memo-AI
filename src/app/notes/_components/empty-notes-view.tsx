import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import CreateNoteButton from "./create-note-button";



export default function EmptyNotesView() {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <FileText className="size-8 text-muted-foreground" />
      </div>

      <div className="text-center max-w-sm">
        <h3 className="text-lg font-medium text-foreground mb-1">
          No notes yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Create your first note to get started.
        </p>

        <CreateNoteButton />
      </div>
    </div>
  );
}

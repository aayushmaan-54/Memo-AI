"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteDialog from "./note-dialog";
import { useState } from "react";



export default function CreateNoteButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="group" >
        <Plus className="group-hover:rotate-90 duration-150" />
        Create Note
      </Button>
      <NoteDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  )
}

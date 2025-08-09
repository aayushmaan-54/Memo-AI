import AIChatButton from "./_components/ai-chat-button";
import CreateNoteButton from "./_components/create-note-button";
import EmptyNotesView from "./_components/empty-notes-view";
import NotesLoadingSkeleton from "./_components/notes-loading-skeleton";



export default function NotesPage() {
  const notes: [] | undefined = [];

  return (
    <>
      <div className="container xl:max-w-6xl mx-auto px-5 mt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <div className="flex gap-2">
            <AIChatButton />
            <CreateNoteButton />
          </div>
        </div>

        {notes === undefined ? (
          <NotesLoadingSkeleton />
        ) : notes.length === 0 ? (
          <EmptyNotesView />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* TODO: Render user's notes here */}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Expand,
  Minimize,
  Send,
  Trash2,
  X
} from "lucide-react";
import {
  useRef,
  useState
} from "react";



export default function AIChatWidget(
  { isOpen, onClose }:
    { isOpen: boolean, onClose: () => void }
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <>
      <aside className={cn(
        "animate-in slide-in-from-bottom-10 bg-card fixed right-4 bottom-4 z-50 flex flex-col rounded-lg border border-border shadow-lg duration-300 2xl:right-16",
        isExpanded
          ? "h-[600px] max-h-[90vh] sm:w-[550px] w-[90vw]"
          : "h-[500px] max-h-[80vh] w-80 sm:w-96"
      )}>
        <header className="bg-primary text-primary-foreground flex items-center justify-between rounded-t-lg border-b border-border p-3">
          <div className="flex items-center gap-2">
            <BrainCircuit size={18} />
            <h3 className="font-medium">Notes Assistant</h3>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-foreground size-8"
              title="Clear Chat"
            >
              {isExpanded ? <Minimize /> : <Expand />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => { }}
              className="text-primary-foreground size-8"
              title="Clear chat"
            >
              <Trash2 />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground size-8"
            >
              <X className="size-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-3">
          {/* TODO: Render messages here */}
          <div ref={messagesEndRef} />
        </div>

        <form className="flex items-center justify-center gap-2 border-t border-border p-3">
          <Textarea
            placeholder="Type your message..."
            className="max-h-[120px] min-h-[40px] resize-none overflow-y-auto"
            maxLength={1000}
            autoFocus
          />
          <Button type="submit" size="icon" >
            <Send />
          </Button>
        </form>
      </aside>
    </>
  );
}

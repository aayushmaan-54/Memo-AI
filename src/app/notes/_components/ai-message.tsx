import MarkdownRenderer from "@/components/global/markdown-renderer";
import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { BrainCircuit } from "lucide-react";



export default function AIMessage({ message }: { message: UIMessage }) {
  const currentStep = message.parts[message.parts.length - 1];

  return (
    <>
      <div
        className={cn(
          "mb-1 flex max-w-[80%] flex-col prose dark:prose-invert mt-3",
          message.role === "user" ? "ml-auto items-end" : "mr-auto items-start mb-7"
        )}
      >
        <div
          className={cn(
            "prose dark:prose-invert rounded-lg px-3 py-2 text-sm",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted-foreground/10 first:prose-p:mt-0"
          )}
        >
          {message.role === "assistant" && (
            <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-medium">
              <BrainCircuit className="text-primary size-3" />
              AI Assistant
            </div>
          )}
          {currentStep?.type === "text" && (
            <MarkdownRenderer>{currentStep.text}</MarkdownRenderer>
          )}
          {currentStep.type === "tool-invocation" && (
            <div className="italic animate-pulse">Searching notes...</div>
          )}
        </div>
      </div>
    </>
  )
}

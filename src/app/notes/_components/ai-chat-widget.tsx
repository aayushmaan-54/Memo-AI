"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthToken } from "@convex-dev/auth/react";
import { useChat } from "@ai-sdk/react";
import {
  BrainCircuit,
  Expand,
  Minimize,
  Send,
  Trash2,
  X
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, UIMessage } from "ai";
import { convexSiteUrl } from "./ai-chat-button";
import AIMessage from "./ai-message";
import AILoader from "./ai-loader";

const initialMessages: UIMessage[] = [
  {
    id: "welcome-message",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Your personal notes assistant. Ready to help you find, summarize, and understand your saved information. \n\nWhat are you looking for?",
      },
    ],
  },
];



export default function AIChatWidget(
  { isOpen, onClose }:
    { isOpen: boolean, onClose: () => void }
) {
  const [input, setInput] = useState("");
  const token = useAuthToken();


  const { messages, sendMessage, setMessages, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${convexSiteUrl}/api/chat`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    messages: initialMessages,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isResponseStreaming = status === "submitted" || status === "streaming";

  useEffect(() => {
    if(isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen, messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isResponseStreaming) {
      sendMessage({ text: input });
      setInput("");
    }
  }

  const handleEnterKeyAiSubmission = (e: React.KeyboardEvent) => {
    if(e.key === "Enter" && !e.shiftKey) {
      onSubmit(e);
    }
  }

  if (!isOpen) return null;

  const lastMessageIsUser = messages[messages.length - 1].role === "user";

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
              onClick={() => setMessages(initialMessages)}
              className="text-primary-foreground size-8"
              title="Clear chat"
              disabled={isResponseStreaming}
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
          {messages.map(message => (
            <AIMessage key={message.id} message={message} />
          ))}
          { status === "submitted" && lastMessageIsUser && <AILoader /> }
          { status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p> }
          <div ref={messagesEndRef} />
        </div>

        <form className="flex items-center justify-center gap-2 border-t border-border p-3" onSubmit={onSubmit}>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="max-h-[120px] min-h-[40px] resize-none overflow-y-auto"
            maxLength={1000}
            autoFocus
            onKeyDown={handleEnterKeyAiSubmission}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isResponseStreaming || !input.trim()}
          >
            <Send />
          </Button>
        </form>
      </aside>
    </>
  );
}

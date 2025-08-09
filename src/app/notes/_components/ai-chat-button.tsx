"use client";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { useState } from "react";
import AIChatWidget from "./ai-chat-widget";


export default function AIChatButton() {
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsChatWidgetOpen(prev => !prev)} variant="outline" size={"icon"}>
        <BrainCircuit />
      </Button>
      <AIChatWidget
        isOpen={isChatWidgetOpen}
        onClose={() => setIsChatWidgetOpen(false)}
      />
    </>
  );
}

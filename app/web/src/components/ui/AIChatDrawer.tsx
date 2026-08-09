"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Card } from "./card";
import { Loader2 } from 'lucide-react'
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "./input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "./tooltip";
import { ArrowUp, Bot, X } from "lucide-react";
import remarkGfm, { } from 'remark-gfm'

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const AIChatDrawer = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_RAG_BACKEND_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          messages: conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      console.log("Data received from server:", data.response);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: data.response[0] }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: "Sorry, I encountered an error connecting to the assistant." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer direction="right">
      <Tooltip>
        <TooltipTrigger asChild>
          <DrawerTrigger asChild>
            <button className="flex items-center justify-center hover:bg-black/70 rounded-full p-3">
              <Bot />
              <span className="sr-only">Ask AI</span>
            </button>
          </DrawerTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Ask AI</p>
        </TooltipContent>
      </Tooltip>

      <DrawerContent className="h-dvh max-h-dvh flex flex-col">
        <DrawerHeader className="flex border-b flex-row justify-between items-center shrink-0">
          <DrawerTitle>Have some Questions?</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="default" aria-label="Close chat" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 flex-1 py-4 flex flex-col gap-4" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                {message.role === "user" ? (
                  <div className="text-sm px-3.5 py-2.5 bg-neutral-900 text-white rounded-2xl max-w-[85%]">
                    {message.content}
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[85%] items-start">
                    { message.content && (
                        <div>
                          <Card className="bg-neutral-100 dark:bg-neutral-950 text-sm px-3.5 py-2.5 rounded-2xl">
                            <Markdown
                              remarkPlugins={[remarkGfm]}
                            >{message.content}</Markdown>
                          </Card>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="max-w-[85%] text-center space-y-3">
                <p className="text-sm text-neutral-500">
                  Hi there! It's really nice to have you. I'm <strong className="text-sky-400">Hami</strong> Ahmad's AI Assistant. What's your name?
                </p>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <DrawerFooter className="shrink-0 border-t bg-white dark:bg-neutral-950 p-4">
          <InputGroup>
            <InputGroupTextarea
              maxLength={500}
              placeholder={isLoading ? "Thinking..." : "Ask me anything..."}
              className="max-h-25 no-scrollbar disabled:opacity-60"
              aria-label="Type your message"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>{input.length}/500</InputGroupText>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                variant="default"
                className="ml-auto rounded-lg py-1.5 px-1.5!"
              >
               {isLoading ? <Loader2 className="animate-spin" /> : <ArrowUp />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Card } from "./card";
import { Skeleton } from "./skeleton";
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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const AssistantSkeleton = () => (
  <div className="max-w-[85%] px-2 my-2.5 py-2 space-y-2 flex-1">
    <Skeleton className="h-3 w-[80%] bg-neutral-200 dark:bg-neutral-800" />
    <Skeleton className="h-3 w-[65%] bg-neutral-200 dark:bg-neutral-800" />
    <Skeleton className="h-3 w-[40%] bg-neutral-200 dark:bg-neutral-800" />
  </div>
);

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
      const response = await fetch('http://localhost:7000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader!.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });

          const parts = buffer.split('\n\n');
          buffer = parts.pop() || "";

          for (const part of parts) {
            const lines = part.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  done = true;
                  break;
                }
                if (data.startsWith('[ERROR]')) {
                  const rawError = data.slice(7).trim();
                  let displayError = "Sorry, I'm having trouble responding right now. Please try again.";
                  
                  try {
                    const jsonStart = rawError.indexOf('{');
                    if (jsonStart !== -1) {
                      const jsonStr = rawError.slice(jsonStart);
                      const parsed = JSON.parse(jsonStr);
                      if (parsed?.error?.message) {
                        displayError = parsed.error.message;
                      } else if (parsed?.message) {
                        displayError = parsed.message;
                      }
                    } else {
                      displayError = rawError;
                    }
                  } catch (e) {
                    displayError = rawError;
                  }

                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: `Error: ${displayError}` }
                        : msg
                    )
                  );
                  break;
                }

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: msg.content + data }
                      : msg
                  )
                );
              }
            }
          }
        }
      }
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
                    {message.content === "" && isLoading ? (
                      <AssistantSkeleton />
                    ) : (
                      <Card className="p-3.5 text-start overflow-hidden text-wrap bg-neutral-50 dark:bg-neutral-900 border-none shadow-none rounded-2xl">
                        <div className="prose prose-sm dark:prose-invert">
                          <Markdown>
                            {message.content}
                          </Markdown>
                        </div>
                      </Card>
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
                <ArrowUp />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

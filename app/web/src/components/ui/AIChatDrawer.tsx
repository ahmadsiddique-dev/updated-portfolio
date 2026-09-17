"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Card } from "./card";
import { Loader2 } from 'lucide-react'
import { Button } from "./button";
import { useChat } from '@ai-sdk/react'
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


const THINKING_MESSAGES = [
  "Thinking",
  "Mulling",
  "Weighing",
  "Synthesizing",
  "Gathering",
  "Connecting the dots",
  "Analyzing request",
  "Crafting response",
];

const ThinkingIndicator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 animate-pulse">
      <span>{THINKING_MESSAGES[index]}</span>
    </div>
  );
};

export const AIChatDrawer = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { messages, sendMessage, status, error } = useChat({});
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, error, status]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await sendMessage({ text: input });
    setInput("");
  };

  const isBusy = status === 'streaming' || status === 'submitted';
  const lastMsg = messages[messages.length - 1];
  const lastMessageHasText =
    lastMsg &&
    lastMsg.role === 'assistant' &&
    lastMsg.parts.some(
      (part) => part.type === 'text' && Boolean(part.text && part.text.trim())
    );
  const showThinking = isBusy && !lastMessageHasText;

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
            messages.map((message, messageIndex) => (
              <div key={message.id || messageIndex} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                {message.role === "user" ? (
                  <div className="text-sm px-3.5 py-2.5 bg-neutral-900 text-white rounded-2xl max-w-[85%]">
                    {message.parts.map((part, index) => (
                      <Markdown key={index} remarkPlugins={[remarkGfm]}>
                        {(part.type === 'text') && part.text || ""}
                      </Markdown>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[85%] items-start">
                    <div>
                      {message.parts.map((part, i) => {
                        if (part.type === "text" && part.text) {
                          return (
                            <Card key={i} className="bg-neutral-100 dark:bg-neutral-950 text-sm px-3.5 py-2.5 rounded-2xl">
                              <Markdown remarkPlugins={[remarkGfm]}>
                                {part.text}
                              </Markdown>
                            </Card>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="max-w-[85%] text-center space-y-3">
                <div className="text-sm text-start text-neutral-500">
                  Hi there! 👋
                  <br />
                  I'm <strong className="text-white">Hami</strong>, Ahmad's AI Assistant.
                  <br />
                  <br />

                  Feel free to ask me anything about Ahmad, his work, projects, or experience.
                  <br />
                  <br />

                  <strong className="text-white">Want to get in touch?</strong>
                  <br />
                  Leave your:
                  <ul className="my-2 list-disc pl-5">
                    <li>Your name</li>
                    <li>Phone number <strong className="text-white">or</strong> email</li>
                  </ul>

                  I'll pass your details along to Ahmad.
                </div>
              </div>
            </div>
          )}
          {showThinking && (
            <div className="flex flex-col items-start">
              <div className="flex gap-2 max-w-[85%] items-start py-1">
                <ThinkingIndicator />
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-start">
              <div className="text-sm px-3.5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl max-w-[85%]">
                {error.message || "Something went wrong!"}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <DrawerFooter className="shrink-0 border-t bg-white dark:bg-neutral-950 p-4">
          <InputGroup>
            <InputGroupTextarea
              maxLength={500}
              placeholder={status === 'streaming' || status === 'submitted' ? "Thinking..." : "Ask me anything..."}
              className="max-h-25 no-scrollbar disabled:opacity-60"
              aria-label="Type your message"
              value={input}
              disabled={status === 'streaming' || status === 'submitted'}
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
                disabled={status === 'streaming' || status === 'submitted' || !input.trim()}
                variant="default"
                className="ml-auto rounded-lg py-1.5 px-1.5!"
              >
                {status === 'streaming' || status === 'submitted' ? <Loader2 className="animate-spin" /> : <ArrowUp />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

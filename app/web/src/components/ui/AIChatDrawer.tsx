"use client";

import { useChat } from "@ai-sdk/react";
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


const AssistantSkeleton = () => (
  <div className="max-w-[85%] px-2 my-2.5 py-2 space-y-2">
    <Skeleton className="h-3 w-[80%]" />
    <Skeleton className="h-3 w-[65%]" />
    <Skeleton className="h-3 w-[40%]" />
  </div>
);

export const AIChatDrawer = () => {
  const [input, setInput] = useState("");
  // const isLoading = status === "submitted" || status === "streaming";
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   });
  // }, [, status]);

  const handleSubmit = async() => {
    // if (!input.trim() || isLoading) return;
    // sendMessage({ text: input });
    const response = await fetch('http://localhost:7000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: input }),
    });

    if (response.ok) {
      setInput('');
    }
    
    const reader = await response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader!.read();
      done = readerDone;
      const chunk = decoder.decode(value);
      console.log('Received chunk:', chunk);
    }
    console.log('Stream ended');
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

      <DrawerContent className="h-dvh max-h-dvh">
        <DrawerHeader className="flex border-b flex-row justify-between">
          <DrawerTitle>Have some Questions?</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="default" aria-label="Close chat">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4" role="log" aria-live="polite" aria-label="Chat messages">
          {/* {messages.length > 0 ? (messages.map((message) => (
            <div key={message.id} className="whitespace-pre-wrap">
              {message.role === "user" ? (
                message.parts.map((part, i) =>
                  part.type === "text" ? (
                    <div
                      key={`${message.id}-${i}`}
                      className="text-sm px-2.5 max-w-[85%] py-2.5 bg-muted/45 rounded-sm m-1.5"
                    >
                      {part.text}
                    </div>
                  ) : null
                )
              ) : (
                <Card className="max-w-[85%] py-4 text-start overflow-hidden text-wrap px-4 my-2.5">
                  <Markdown>
                    {message.parts
                      .filter((p) => p.type === "text")
                      .map((p) => p.text)
                      .join("")}
                  </Markdown>
                </Card>
              )}
            </div>
          ))) : (
            <div className="max-w-[85%] px-2 my-2.5 py-2 space-y-2">
              <p className="text-sm text-muted-foreground self-center text-center">Hey good to see you! I am an Assistant <strong className="text-blue-400">"Hami"</strong>,  what's your name?</p>
            </div>
          )} */}
          {/* {isLoading && <AssistantSkeleton />} */}
        </div>
        <div ref={bottomRef} />
        <DrawerFooter>
          <InputGroup>
            <InputGroupTextarea
              maxLength={500}
              // placeholder={isLoading ? "Thinking..." : "Write a comment..."}
              className="max-h-25 no-scrollbar disabled:opacity-60"
              aria-label="Type your message"
              value={input}
              // disabled={isLoading}
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
                // disabled={isLoading || !input.trim()}
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

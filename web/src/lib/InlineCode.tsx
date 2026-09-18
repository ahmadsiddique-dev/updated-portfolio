"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface InlineCodeProps {
  children: React.ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  const text = String(children);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy code"}
      className="flex hover:select-text selection:text-red-700 items-center hover:cursor-pointer w-full min-h-17 rounded-md bg-black font-mono justify-between px-5 text-zinc-200 transition-color"
    >
      <code>{children}</code>

      {copied ? (
        <Check className="h-3 w-3 text-green-400" />
      ) : (
        <Copy className="h-3 hover:text-white w-3 text-zinc-500" />
      )}
    </button>
  );
}
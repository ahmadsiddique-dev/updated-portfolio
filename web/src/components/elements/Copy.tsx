"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="p-1.5 duration-400 rounded-md transition-all border border-transparent hover:border-zinc-800"
      aria-label="Copy code"
    >
      {isCopied ? (
        <Check className="h-3 w-3 text-gray-50" />
      ) : (
        <Copy className="h-3 w-3 text-zinc-400" />
      )}
    </button>
  );
};
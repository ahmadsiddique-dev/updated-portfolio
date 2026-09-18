
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/elements/Copy"; 

interface Props {
  children: string;
  lang: BundledLanguage;
  fileName?: string; 
}

export default async function CodeBlock({ children, lang, fileName }: Props) {
  const out = await codeToHtml(children, {
    lang,
    
    theme: "vitesse-black",
  });

  return (
    <div className="relative overflow-hidden bg-black rounded-lg border">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
           
           <span className="ml-2 text-xs font-medium text-gray-400">
             {fileName || lang}
           </span>
        </div>

        <CopyButton text={children} />
      </div>

      <div 
        className="overflow-x-auto text-md px-2.5 bg-black no-scrollbar leading-6"
        dangerouslySetInnerHTML={{ __html: out }} 
      />
    </div>
  );
}


import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-7 my-4 text-zinc-200">{children}</p>
    ),

    h1: ({ children }) => (
      <h1 className="scroll-m-20 my-6 text-4xl font-bold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="scroll-m-20 mt-12 mb-4 border-b border-zinc-800 pb-2 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="scroll-m-20 mt-10 mb-3 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="scroll-m-20 mt-8 mb-2 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-zinc-700 pl-6 italic text-zinc-400">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="leading-7">{children}</li>
    ),

    number: ({ children }) => (
      <li className="leading-7">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-100">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-zinc-300">
        {children}
      </em>
    ),

    link: ({ value, children }) => (
      <a
        href={value.href}
        className="font-medium underline underline-offset-4 decoration-zinc-500 hover:decoration-zinc-200 transition-colors"
      >
        {children}
      </a>
    ),

    code: ({ children }) => (
      <Badge className="rounded-md px-2 py-0.5 text-sm">
        {children}
      </Badge>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          src={urlFor(value).width(900).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          width={900}
          height={500}
          unoptimized
          className="my-8 rounded-lg border border-zinc-800"
        />
      );
    },
  },
};
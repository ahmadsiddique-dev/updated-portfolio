import React from 'react'
import { getBlog } from './_lib/get-blog'
import { PortableText } from '@portabletext/react'
import Image from 'next/image';
import { portableTextComponents } from '@/lib/portabletext';

type Props = {
  params: {
    slug: string
  }
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  if (!slug) {
    // Only classess I have on my finger tips
    return <h1 className="tracking-tight leading-relaxed shadow-lg text-center text-2xl font-bold">Something went wrong</h1>
  }

  const blog = await getBlog(slug);
  return (
    <div>
      <h1 className="scroll-m-20 my-6 text-4xl font-bold tracking-tight lg:text-5xl">{blog[0].title}</h1>
      <blockquote className="my-6 border-l-4 border-zinc-700 pl-6 italic text-zinc-400">
        {blog[0].description}
      </blockquote>
      <Image 
      src={blog[0].image || ""}
        alt={blog[0].title ?? "sample image"}
        width={900}
        height={500}
      sizes="(max-width: 768px) 100vw, 900px"
        className="my-8 rounded-lg border border-zinc-800"
      />
      <PortableText 
      value={blog[0].detail}
      components={portableTextComponents}
       />
    </div>
  )
}

export default page
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
      <h1>{blog[0].title}</h1>
      <p>{blog[0].description}</p>
      <Image src={blog[0].image || ""} alt="not to show" height={400} width={400}/> { /* TODO: put here some temp img*/}
      <PortableText 
      value={blog[0].detail}
      components={portableTextComponents}
       />
    </div>
  )
}

export default page
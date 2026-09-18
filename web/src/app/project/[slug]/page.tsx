import React from 'react'
import { getProject } from './_lib/get-project'
import { getProjects } from '../_lib/get-projects'
import { portableTextComponents } from '@/lib/portabletext';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { PrevNextNav, getPrevNextItems } from '@/components/elements/PrevNextNav';

const page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const [project, allProjects] = await Promise.all([
      getProject(slug),
      getProjects()
    ]);

    if (!project || !project[0]) {
      return <h1 className="tracking-tight leading-relaxed shadow-lg text-center text-2xl font-bold">Project not found</h1>
    }

    const { prev, next } = getPrevNextItems(allProjects, slug);

    return (
        <div>
            <div>
                <h1 className="scroll-m-20 my-6 text-4xl font-bold tracking-tight lg:text-5xl">{project[0].title}</h1>
                <blockquote className="my-6 border-l-4 border-zinc-700 pl-6 italic text-zinc-400">
                    {project[0].description}
                </blockquote>
                <Image
                    src={project[0].image || ""}
                    alt={project[0].title ?? "sample image"}
                    width={900}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="my-8 rounded-lg border border-zinc-800"
                />
                <PortableText
                    value={project[0].detail}
                    components={portableTextComponents}
                />
                <PrevNextNav prev={prev} next={next} basePath="/project" label="Project" />
            </div>
        </div>
    )
}

export default page
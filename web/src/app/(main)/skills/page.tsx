import React from 'react'
import { getSkills } from './_lib/getSkill';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const page = async () => {
  const skills = await getSkills();

  return (
    <main className="mx-auto px-2 min-h-[80vh] max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Skills</h1>
      <div className="grid gap-10 md:grid-cols-6 my-4 grid-cols-3">
        {skills.map((skill) => (
          <Tooltip key={skill.name}>
            <TooltipTrigger asChild>
              <div key={skill.name} className="flex flex-col items-center">
                <Image
                  src={skill.image || '/default-skill-image.jpg'}
                  alt={skill.name || 'Skill Image'}
                  width={35}
                  height={35}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {skill.name || 'Skill Name'}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </main>
  )
}

export default page;





import React from 'react'
import { getSkills } from './_lib/getSkill';
import Image from 'next/image';

const page = async () => {
  const frontend = await getSkills('frontend')
  const backend = await getSkills('backend')
  const database = await getSkills('database')
  const devops = await getSkills('devops')
  const other = await getSkills('other')

  return (
    <main className="mx-auto px-2 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-3">Frontend</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        {frontend.map((skill) => (
          <div key={skill.name} className="h-15 w-15 bg-transparent rounded-lg shadow-lg hover:opacity-90 transition-all">
            <Image src={skill.image || "/default-image.png"} width={100} height={100} alt={skill.name || ""}/>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-3">Backend</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        {backend.map((skill) => (
          <div key={skill.name} className="h-15 w-15 bg-transparent rounded-lg shadow-lg hover:opacity-90 transition-all">
            <Image src={skill.image || "/default-image.png"} width={100} height={100} alt={skill.name || ""} />
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-3">Database</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        {database.map((skill) => (
          <div key={skill.name} className="h-15 w-15 bg-transparent rounded-lg shadow-lg hover:opacity-90 transition-all">
            <Image src={skill.image || "/default-image.png"} width={100} height={100} alt={skill.name || ""} />
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-3">DevOps</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        {devops.map((skill) => (
          <div key={skill.name} className="h-15 w-15 bg-transparent rounded-lg shadow-lg hover:opacity-90 transition-all">
            <Image src={skill.image || "/default-image.png"} alt={skill.name || ""} width={100} height={100} />
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold mb-3">Other</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        {other.map((skill) => (
          <div key={skill.name} className="h-15 w-15 bg-transparent rounded-lg shadow-lg hover:opacity-90 transition-all">
            <Image src={skill.image || "/default-image.png"} alt={skill.name || ""} width={100} height={100}  />
          </div>
        ))}
      </div>
    </main>
  )
}

export default page
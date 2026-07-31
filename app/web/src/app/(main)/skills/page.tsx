import React from 'react'
import { getSkills } from './_lib/getSkill';

const page = async () => {
  // const frontend = await getSkills('frontend')
  // if (frontend) {
  //   console.log("Frontend: ", frontend)
  // }
  return (
    <main className="mx-auto px-2 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-3">Frontend</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
      </div>
      <h1 className="text-3xl font-semibold mb-3">Backend</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
      </div>
      <h1 className="text-3xl font-semibold mb-3">Database</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
      </div>
      <h1 className="text-3xl font-semibold mb-3">Other</h1>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
      </div>
      <div className="grid gap-3 md:grid-cols-6 my-4 grid-cols-3">
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-green-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-blue-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
        <div className="h-15 w-15 bg-red-500 rounded-lg shadow-lg hover:opacity-90 transition-all"></div>
      </div>
    </main>
  )
}

export default page
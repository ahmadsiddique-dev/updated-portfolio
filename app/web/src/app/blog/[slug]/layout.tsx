import BlogNav from '@/components/elements/BlogNav'
import BlogFooter from '@/components/elements/BlogFooter'
import React from 'react'
import {} from 'next'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" className="my-10">
      <BlogNav />
      {children}
      <BlogFooter />
    </main>
  )
}

export default layout
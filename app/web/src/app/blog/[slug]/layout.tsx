import React from 'react'
import Nav from '@/components/elements/Nav';
import Foot from '@/components/elements/Foot';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" className="my-10">
      <Nav name="Blogs"/>
      {children}
      <Foot />
    </main>
  )
}

export default layout
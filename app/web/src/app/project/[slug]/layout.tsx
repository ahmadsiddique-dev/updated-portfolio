import ProjFooter from '@/components/elements/ProjFooter';
import ProjNav from '@/components/elements/ProjNav';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" className="my-10">
      <ProjNav />
      {children}
      <ProjFooter />
    </main>
  )
}

export default layout;
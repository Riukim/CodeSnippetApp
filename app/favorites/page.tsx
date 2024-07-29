import React from 'react'
import Sidebar from '../my-notes/components/Sidebar/Sidebar'
import ContentSection from '../my-notes/components/Content/ContentSection'

const favorites = () => {
  return (
    <section className='flex h-auto'>
      <Sidebar />
      <ContentSection />
    </section>
  )
}

export default favorites
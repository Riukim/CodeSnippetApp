import React from 'react'
import Sidebar from '../my-notes/components/Sidebar/Sidebar'
import ContentSection from '../my-notes/components/Content/ContentSection'

const trash = () => {
  return (
    <section className="flex h-auto">
      <Sidebar />
      <ContentSection />
    </section>
  )
}

export default trash
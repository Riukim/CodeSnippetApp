import React from "react"
import Sidebar from "../my-snippets/components/Sidebar/Sidebar"
import ContentSection from "../my-snippets/components/Content/ContentSection"

const favorites = () => {
  return (
    <section className="flex h-dvh">
      <Sidebar />
      <ContentSection />
    </section>
  )
}

export default favorites

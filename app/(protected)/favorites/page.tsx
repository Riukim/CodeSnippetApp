import React from "react"
import ContentSection from "../my-snippets/components/Content/ContentSection"
import SidebarWrapper from "@/app/(public)/components/SidebarWrapper"

const favorites = () => {
  return (
    <section className="flex h-full">
      <SidebarWrapper />
      <ContentSection />
    </section>
  )
}

export default favorites

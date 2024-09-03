import SidebarWrapper from "@/app/(public)/components/SidebarWrapper"
import ContentSection from "../my-snippets/components/Content/ContentSection"

const favorites = () => {
  return (
    <section className="flex h-full">
      <SidebarWrapper />
      <ContentSection />
    </section>
  )
}

export default favorites

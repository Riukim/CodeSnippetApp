import SidebarWrapper from "@/app/(public)/components/SidebarWrapper"
import ContentSection from "./components/Content/ContentSection"

const page = () => {
  return (
    <section className="flex">
      <SidebarWrapper />
      <ContentSection />
    </section>
  )
}

export default page
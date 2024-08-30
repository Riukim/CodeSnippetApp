import SidebarWrapper from "@/app/(public)/components/SidebarWrapper"
import ContentSection from "./components/Content/ContentSection"
import Sidebar from "./components/Sidebar/Sidebar"

const page = () => {
  return (
    <section className="flex">
      <SidebarWrapper />
      <ContentSection />
    </section>
  )
}

export default page
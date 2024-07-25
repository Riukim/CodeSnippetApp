import ContentSection from "./components/Content/ContentSection"
import Sidebar from "./components/Sidebar/Sidebar"

const page = () => {
  return (
    <section className="flex h-auto">
      <Sidebar />
      <ContentSection />
    </section>
  )
}

export default page
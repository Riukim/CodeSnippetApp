import ContentSection from "./components/Content/ContentSection"
import Sidebar from "./components/Sidebar/Sidebar"

const page = () => {
  return (
    <section className="flex h-dvh">
      <Sidebar />
      <ContentSection />
    </section>
  )
}

export default page
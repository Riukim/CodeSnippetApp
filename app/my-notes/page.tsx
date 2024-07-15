import ContentSection from "./components/Content/ContentSection"
import Sidebar from "./components/Sidebar/Sidebar"

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ContentSection />
    </div>
  )
}

export default page
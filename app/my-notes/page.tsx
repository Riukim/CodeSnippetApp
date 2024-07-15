import { UserButton } from "@clerk/nextjs"
import Sidebar from "./components/Sidebar"

const page = () => {
  return (
    <div>
      <Sidebar />
      {/* <UserButton /> */}
    </div>
  )
}

export default page
"use client"

import DarkMode from "@/app/(protected)/my-snippets/components/Content/TopBar/DarkMode"
import Searchbar from "@/app/(protected)/my-snippets/components/Content/TopBar/Searchbar"
import SidebarMenu from "@/app/(protected)/my-snippets/components/Content/TopBar/SidebarMenu"
import UserProfile from "@/app/(protected)/my-snippets/components/Content/TopBar/UserProfile"
import { useUser } from "@clerk/nextjs"

const TopBar = () => {
  const { user } = useUser()

  return (
    <section className="pt-5">
      <div className="flex justify-between items-center bg-background p-3 rounded-lg">
        {user && <UserProfile />}
        <Searchbar />
        <div className="flex gap-2 items-center">
          <DarkMode />
          <SidebarMenu showQuickLinks={!!user} />
        </div>
      </div>
    </section>
  )
}

export default TopBar

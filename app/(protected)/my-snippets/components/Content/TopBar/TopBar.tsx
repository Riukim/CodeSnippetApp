"use client"

import { useAppContext } from '@/ContextApi'
import DarkMode from './DarkMode'
import Searchbar from './Searchbar'
import SidebarMenu from './SidebarMenu'
import UserProfile from './UserProfile'
import { useUser } from '@clerk/nextjs'

const TopBar = () => {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
  } = useAppContext()

  const { user } = useUser()
  
  return (
    <div
      className={`rounded-lg flex justify-between items-center bg-background p-3 shadow-md gap-1 ${
        isOpen ? `${isMobile ? "blur-sm" : ""}` : ""
      }`}
    >
      <UserProfile />
      <Searchbar />

      <div className="flex justify-between items-center">
        <DarkMode />
        <SidebarMenu showQuickLinks={!!user} />
      </div>
    </div>
  )
}

export default TopBar
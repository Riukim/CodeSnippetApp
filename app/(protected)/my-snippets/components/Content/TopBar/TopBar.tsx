"use client"

import { useAppContext } from '@/ContextApi'
import DarkMode from './DarkMode'
import Searchbar from './Searchbar'
import SidebarMenu from './SidebarMenu'
import UserProfile from './UserProfile'

const TopBar = () => {
  const {
    snippetPanel: { isOpen },
    isMobileState: { isMobile },
  } = useAppContext()
  
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
        <SidebarMenu />
      </div>
    </div>
  )
}

export default TopBar
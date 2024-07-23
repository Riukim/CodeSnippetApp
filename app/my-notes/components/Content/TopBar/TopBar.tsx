"use client"

import React from 'react'
import UserProfile from './UserProfile'
import Searchbar from './Searchbar'
import DarkMode from './DarkMode'
import SidebarMenu from './SidebarMenu'
import { useAppContext } from '@/ContextApi'

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
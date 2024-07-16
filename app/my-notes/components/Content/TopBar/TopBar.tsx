import React from 'react'
import UserProfile from './UserProfile'
import Searchbar from './Searchbar'
import DarkMode from './DarkMode'
import SidebarMenu from './SidebarMenu'

const TopBar = () => {
  return (
    <div className='rounded-lg flex justify-between items-center bg-card p-3 shadow-md'>
      <UserProfile />
      <Searchbar />

      <div className='flex gap-4 items-center'>
        <DarkMode />
        <SidebarMenu />
      </div>
    </div>
  )
}

export default TopBar
import React from 'react'
import UserProfile from './UserProfile'
import Searchbar from './Searchbar'

const TopBar = () => {
  return (
    <div className='rounded-lg flex justify-between items-center bg-card p-3'>
      <UserProfile />
      <Searchbar />
    </div>
  )
}

export default TopBar
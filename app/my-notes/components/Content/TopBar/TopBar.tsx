import React from 'react'
import UserProfile from './UserProfile'

const TopBar = () => {
  return (
    <div className='rounded-lg flex justify-between items-center bg-card p-3'>
      <UserProfile />
    </div>
  )
}

export default TopBar
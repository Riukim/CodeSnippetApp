"use client"

import { useUser } from '@clerk/nextjs'
import React from 'react'

const UserProfile = () => {
  const {user} = useUser()
  const imgUrl = user?.imageUrl

  const loading = (
    <div className='w-9 h-9 rounded-full mb-[5px] bg-slate-600'></div>
  )

  return (
    <div className='flex gap-3 items-center'>
      {!user ? (
        loading 
      ) : (
          <img
            src={imgUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
            className='w-9 h-9 rounded-full mb-[5px]'
          />
      )}

      <div className='flex flex-col text-sm'>
        <span className='font-semibold'>
          {user?.lastName} {user?.firstName}
        </span>
        <span className='text-slate-500 text-[11px]'>
          {user?.emailAddresses[0].emailAddress}
        </span>
      </div>
    </div>
  )
}

export default UserProfile
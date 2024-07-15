import Languages from '@/components/Languages'
import Logo from '@/components/Logo'
import QuickLinks from '@/components/QuickLinks'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-[20%] p-5 flex flex-col gap-2 h-screen pt-7 border-r'>
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  )
}

export default Sidebar
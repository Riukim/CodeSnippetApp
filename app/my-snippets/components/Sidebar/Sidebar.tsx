import Languages from '@/components/Languages'
import Logo from '@/components/Logo'
import QuickLinks from '@/components/QuickLinks'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='max-lg:hidden h-auto pr-10 p-6 flex flex-col gap-2 pt-7 border-r'>
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  )
}

export default Sidebar
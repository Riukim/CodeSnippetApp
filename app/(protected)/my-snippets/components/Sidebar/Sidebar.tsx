"use client"

import AuthLinks from '@/components/AuthLinks'
import Languages from '@/components/Languages'
import Logo from '@/components/Logo'
import QuickLinks from '@/components/QuickLinks'
import { SidebarProps } from '@/types/context'
import Link from 'next/link'
import React from "react"

const Sidebar = ({ showQuickLinks }: SidebarProps) => {
  return (
    <div className="max-lg:hidden bg-background h-auto max-w-[241px] pr-10 p-6 flex flex-col gap-2 pt-8 border-r">
      <Link href="/">
        <Logo />
      </Link>
      {showQuickLinks ? <QuickLinks /> : <AuthLinks />}
      <Languages />
    </div>
  )
}

export default Sidebar
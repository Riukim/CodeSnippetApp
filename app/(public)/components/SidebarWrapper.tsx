"use client"

import Sidebar from "@/app/(protected)/my-snippets/components/Sidebar/Sidebar"
import Logo from "@/components/Logo"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"

const SidebarWrapper = () => {
  const { user, isLoaded } = useUser()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !isLoaded) {
    return (
      <>
        <div className="max-lg:hidden bg-background h-auto max-w-[241px] pr-10 p-6 flex flex-col gap-2 pt-8 border-r">
          <Link href="/">
            <Logo />
          </Link>
          <div className="mt-20">
            <div className="font-bold text-sm">Quick Links</div>
            <ul className="text-slate-400 mt-4 flex flex-col gap-4">
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
            </ul>

            <div className="mt-12 font-bold text-sm">Languages</div>
            <ul className="text-slate-400 mt-4 flex flex-col gap-4">
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
              <li className="animate-pulse bg-gray-300 rounded-md h-6 w-[80%]"></li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  return <Sidebar showQuickLinks={!!user} />
}

export default SidebarWrapper

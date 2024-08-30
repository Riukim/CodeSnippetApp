"use client"

import Sidebar from "@/app/(protected)/my-snippets/components/Sidebar/Sidebar"
import { useUser } from "@clerk/nextjs"

const SidebarWrapper = () => {
  const { user } = useUser()

  return <Sidebar showQuickLinks={!!user} />
}

export default SidebarWrapper

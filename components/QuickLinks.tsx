"use client"

import { useAppContext } from "@/ContextApi"
import { useRouter } from "next/navigation"
import { useAuth, useClerk } from "@clerk/nextjs"
import React from "react"
import { LogOut } from "lucide-react"

const QuickLinks = () => {
  const {
    menuState: { menuItems, setMenuItems },
    resetContext,
  } = useAppContext()

  const { signOut } = useClerk()
  const { userId } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    signOut()
    router.push("/")
    resetContext()
  }

  const clickedMenuItem = async (index: number) => {
    if (!userId) {
      router.push("/")
      return
    }

    const updatedMenuItems = menuItems.map((menu, i) => ({
      ...menu,
      isSelected: i === index,
    }))
    setMenuItems(updatedMenuItems)
    // console.log("menu items change: ",updatedMenuItems);
    router.push(menuItems[index].path)
  }

  return (
    <div className="mt-20 text-sm">
      <div className="font-bold">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedMenuItem(index)}
            className={`flex cursor-pointer select-none gap-2 p-[7px] px-2 items-center w-[80%] rounded-md ${
              menu.isSelected
                ? "bg-primary text-foreground font-semibold"
                : "text-slate-400"
            }`}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </li>
        ))}
        <li
          className="flex cursor-pointer select-none gap-2 p-[7px] px-2 items-center w-[80%] rounded-md text-slate-400"
          onClick={handleLogout}
        >
          <LogOut size={18} className="flex-none" />
          <p>Sign Out</p>
        </li>
      </ul>
    </div>
  )
}

export default QuickLinks

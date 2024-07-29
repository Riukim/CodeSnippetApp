"use client"

import { useAppContext } from "@/ContextApi"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

const QuickLinks = () => {
  const {
    menuState: { menuItems, setMenuItems },
  } = useAppContext()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const updatedMenuItems = menuItems.map((menu) => ({
      ...menu,
      isSelected: pathname === menu.path,
    }))
    setMenuItems(updatedMenuItems)
  }, [pathname])

  function clickedMenuItem(index: number) {
    const updatedMenuItems = menuItems.map((menu, i) => ({
      ...menu,
      isSelected: i === index,
    }))
    setMenuItems(updatedMenuItems)
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
      </ul>
    </div>
  )
}

export default QuickLinks

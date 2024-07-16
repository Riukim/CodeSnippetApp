"use client"

import { useAppContext } from "@/ContextApi"
import React from "react"

const QuickLinks = () => {
  const {
    menuState: { menuItems, setMenuItems },
  } = useAppContext()

  function clickedMenuItem(index: number) {
    const updateMenuItem = menuItems.map((menu, i) => {
      if (i === index) {
        return {...menu, isSelected: true}
      } else {
        return {...menu, isSelected: false}
      }
    })

    setMenuItems(updateMenuItem)
  }

  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedMenuItem(index)}
            className={`flex cursor-pointer select-none gap-2 p-[7px] px-2 items-center w-[60%] rounded-md ${
              menu.isSelected ? "bg-primary text-foreground font-semibold" : "text-slate-400"
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

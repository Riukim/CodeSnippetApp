"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"

const Skeleton = () => (
  <div className="bg-accent h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]">
    <div className="bg-card w-7 h-7 rounded-full animate-pulse"></div>
    <div className="bg-card w-7 h-7 rounded-full animate-pulse"></div>
  </div>
)

const DarkMode = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton />
  }

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <div className="relative bg-accent h-[36px] w-[74px] rounded-3xl flex items-center justify-between overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-start transition-transform duration-700  ${
          theme === "light"
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform translate-x-10"
        }`}
        onClick={changeTheme}
      >
        <div className="bg-primary text-foreground font-semibold w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer select-none">
          <Sun size={18} />
        </div>
      </div>
      <div
        className={`absolute inset-0 flex justify-end transition-transform duration-700 ${
          theme === "dark"
            ? "opacity-100 transform translate-x-0"
            : "opacity-0 transform -translate-x-10"
        }`}
        onClick={changeTheme}
      >
        <div className="bg-primary text-foreground font-semibold w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer select-none">
          <Moon size={18} />
        </div>
      </div>
    </div>
  )
}

export default DarkMode

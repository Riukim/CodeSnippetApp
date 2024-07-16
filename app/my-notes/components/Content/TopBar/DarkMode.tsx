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

  return (
    <div className="bg-accent h-[36px] w-[74px] rounded-3xl flex items-center gap-2 pl-[5px]">
      <div
        className={`${theme === "light" ? "bg-primary" : "bg-card"}
          text-foreground font-semibold w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
        onClick={() => setTheme("light")}
      >
        <Sun size={18} />
      </div>
      <div
        className={`${theme === "dark" ? "bg-primary" : "bg-card"}
          text-foreground font-semibold w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-1 cursor-pointer select-none`}
        onClick={() => setTheme("dark")}
      >
        <Moon size={18} />
      </div>
    </div>
  )
}

export default DarkMode

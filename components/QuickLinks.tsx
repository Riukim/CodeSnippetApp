"use client"

import { useAppContext } from "@/ContextApi"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import React from "react"

const QuickLinks = () => {
  const {
    menuState: { menuItems, setMenuItems },
  } = useAppContext()

  const { userId } = useAuth()
  // const { signOut } = useClerk()
  
  const router = useRouter()

/*   const handleLogout = async () => {
    try {
      await signOut({ redirectUrl: "/" })
    } catch (error) {
      console.error("Logout failed", error)
    }
  } */

  // useEffect per aggiornare lo stato del menu ogni volta che il percorso dell'URL cambia
  /* useEffect(() => {
    const updatedMenuItems = menuItems.map((menu) => ({
      ...menu,
      isSelected: pathname === menu.path,
    }))
    setMenuItems(updatedMenuItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]) */

  const clickedMenuItem = async (index: number) => {
/*     if (menuItems[index].name === "Log Out") {
      // Clear menu items and handle logout
      const clearMenuItems = menuItems.map((menu, i) => ({
        ...menu,
        isSelected: i === index,
      }))

      console.log("Clear menu Items", clearMenuItems);
      await handleLogout()
      setMenuItems(clearMenuItems)

      console.log("menuItems prima di logout: ",menuItems);
      
      return
    } */
    
    if (!userId ) return

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
        {/* <li
          className="flex cursor-pointer select-none gap-2 p-[7px] px-2 items-center w-[80%] rounded-md text-slate-400"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-2">
            <LogOut
              size={18}
              className="flex-none"
            />
            <span>Log Out</span>
          </div>
        </li> */}
      </ul>
    </div>
  )
}

export default QuickLinks

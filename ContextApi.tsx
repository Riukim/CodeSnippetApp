"use client"

import { Grid2X2, Heart, LogOut, Moon, Sun, Trash2 } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"

// Definisce l'interfaccia per un elemento del menu della sidebar
interface MenuItem {
  id: number
  name: string
  isSelected: boolean
  icon: React.ReactNode
}

// Definisce il tipo del contesto dell'applicazione con lo stato del menu della sidebar e la funzione per aggiornarlo
interface AppContextType {
  menuState: {
    menuItems: MenuItem[]
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  }
  snippetPanel: {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
  isMobileState: {
    isMobile: boolean
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const AppContext = createContext<AppContextType>({
  menuState: {
    menuItems: [],
    setMenuItems: () => {},
  },
  snippetPanel: {
    isOpen: false,
    setIsOpen: () => {},
  },
  isMobileState: {
    isMobile: false,
    setIsMobile: () => {}
  }
})

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Definisce lo stato del menu della sidebar e la funzione per aggiornarlo
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "All Snippets",
      isSelected: true,
      icon: (
        <Grid2X2
          size={18}
          className="flex-none"
        />
      ),
    },
    {
      id: 2,
      name: "Favorites",
      isSelected: false,
      icon: (
        <Heart
          size={18}
          className="flex-none"
        />
      ),
    },
    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icon: (
        <Trash2
          size={18}
          className="flex-none"
        />
      ),
    },
    {
      id: 4,
      name: "Log Out",
      isSelected: false,
      icon: (
        <LogOut
          size={18}
          className="flex-none"
        />
      ),
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <=  700)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        menuState: { menuItems, setMenuItems },
        snippetPanel: { isOpen, setIsOpen },
        isMobileState: {isMobile, setIsMobile}
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }

  return context
}

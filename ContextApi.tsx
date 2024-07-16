"use client"

import { Grid2X2, Heart, LogOut, Moon, Sun, Trash2 } from "lucide-react"
import { createContext, useContext, useState } from "react"

// Definisce l'interfaccia per un elemento del menu della sidebar
interface MenuItem {
  id: number
  name: string
  isSelected: boolean
  icon: React.ReactNode
}

interface DarkModeType {
  id: number
  icon: React.ReactNode,
  isSelected: boolean
}

// Definisce il tipo del contesto dell'applicazione con lo stato del menu della sidebar e la funzione per aggiornarlo
interface AppContextType {
  menuState: {
    menuItems: MenuItem[]
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  }
  darkModeObject: {
    darkMode: DarkModeType[],
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>
  }
}

const AppContext = createContext<AppContextType>({
  menuState: {
    menuItems: [],
    setMenuItems: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {}
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

  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      icon: <Sun size={18} />,
      isSelected: true
    },
    {
      id: 2,
      icon: <Moon size={18} />,
      isSelected: false
    }
  ])

  return (
    <AppContext.Provider value={{
      menuState: { menuItems, setMenuItems },
      darkModeObject: { darkMode, setDarkMode}
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizzato per usare il contesto dell'applicazione
export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }

  return context
}

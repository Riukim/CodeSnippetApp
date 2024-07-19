"use client"

import { Grid2X2, Heart, LogOut, Trash2 } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"
import { AppContextType, MenuItem, SingleSnippetTypes } from "./types/context"
import { formatDate } from "./lib/formatDate"

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
    setIsMobile: () => {},
  },
  snippetsState: {
    allSnippets: [],
    setAllSnippets: () => {},
  },
  SelectedSnippetState: {
    selectedSnippet: null,
    setSelectedSnippet: () => {}
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
  const [allSnippets, setAllSnippets] = useState<SingleSnippetTypes[]>([])
  const [selectedSnippet, setSelectedSnippet] = useState<SingleSnippetTypes | null>(null)

  // Effeto per gestire il ridimensionamento della pagina
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 700)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Effect che simula il caricamento degli snippet di codice
  useEffect(() => {
    const updateSnippets = () => {
      const newSnippets: SingleSnippetTypes[] = [
        {
          id: 1,
          title: "Test",
          tags: ["react", "nextjs"],
          description: "Test Description",
          code: `import React from 'react'

const CodeSnippet = () => {
  return (
    <div>CodeSnippet</div>
    )
  }

export default CodeSnippet`,
          language: "Javascript",
          creationDate: formatDate(new Date()),
          isFavorite: false,
          isPublic: false,
        },
        {
          id: 2,
          title: "Test",
          tags: ["My Snippet", "nextjs"],
          description: "Test Description",
          code: `#include <iostream>

class CodeSnippet {
public:
    void render() const {
        std::cout << "CodeSnippet" << std::endl;
    }
};

int main() {
    CodeSnippet snippet;
    snippet.render();
    return 0;
}
`,
          language: "C++",
          creationDate: formatDate(new Date()),
          isFavorite: false,
          isPublic: false,
        },
      ]
      setAllSnippets(newSnippets)
    }

    const timeoutId = setTimeout(() => {
      updateSnippets()
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }

  }, [])

  return (
    <AppContext.Provider
      value={{
        menuState: { menuItems, setMenuItems },
        snippetPanel: { isOpen, setIsOpen },
        isMobileState: { isMobile, setIsMobile },
        snippetsState: { allSnippets, setAllSnippets },
        SelectedSnippetState: { selectedSnippet, setSelectedSnippet }
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
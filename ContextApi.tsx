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
    clerkId: "",
    setClerkId: () => {},
    updateSnippet: async () => {},
  },
  SelectedSnippetState: {
    selectedSnippet: null,
    setSelectedSnippet: () => {},
  },
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
  const [selectedSnippet, setSelectedSnippet] =
    useState<SingleSnippetTypes | null>(null)
  const [clerkId, setClerkId] = useState("")

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
  /*   useEffect(() => {
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

  }, []) */

  // Use Effect per il fetch di tutti gli snippet in base al clerkID
  useEffect(() => {
    if (!clerkId) return

    const fetchAllSnippets = async () => {
      try {
        const response = await fetch(`/api/snippets?clerkId=${clerkId}`)
        if (!response) {
          throw new Error("Unable to fetch code snippets")
        }
        const data = await response.json()

        if (data.snippets) {
          console.log("snippets: ", data.snippets)
          const formattedSnippets = data.snippets.map(
            (snippet: SingleSnippetTypes) => ({
              ...snippet,
              creationDate: formatDate(snippet.creationDate), // Format the date
            })
          )
          setAllSnippets(formattedSnippets)
        }
      } catch (error) {
        console.log("Error fetching snippets:", error)
      }
    }

    fetchAllSnippets()
  }, [clerkId])

  // Funzione per aggiornare gli Snippet
  const updateSnippet = async (snippetId: number, newTitle: string) => {
    try {
      const response = await fetch(`/api/snippets?id=${snippetId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      })

      if (!response.ok) {
        throw new Error("Failed to update the snippet")
      }

      const updatedSnippet = await response.json()

      setAllSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet._id === snippetId ? { ...snippet, title: newTitle } : snippet
        )
      )
      return updatedSnippet
    } catch (error) {
      console.log(error)
      throw new Error("Failed to update the snippet")
    }
  }

  return (
    <AppContext.Provider
      value={{
        menuState: { menuItems, setMenuItems },
        snippetPanel: { isOpen, setIsOpen },
        isMobileState: { isMobile, setIsMobile },
        snippetsState: {
          allSnippets,
          setAllSnippets,
          clerkId,
          setClerkId,
          updateSnippet,
        },
        SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
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

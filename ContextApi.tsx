"use client"

import { Grid2X2, Heart, LogOut, Trash2 } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"
import { AppContextType, MenuItem, SingleSnippetTypes, SingleTagType } from "./types/context"
import { formatDate } from "./lib/formatDate"
import { usePathname } from "next/navigation"

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
    deleteSnippet: async () => {},
  },
  SelectedSnippetState: {
    selectedSnippet: null,
    setSelectedSnippet: () => {},
  },
  addSnippetState: {
    isAdding: false,
    setIsAdding: () => {},
    addSnippet: async () => {},
  },
  TagsState: {
    allTags: [],
    setAllTags: () => {},
    addTag: async () => {},
    deleteTag: async () => {},
  },
})

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Definisce lo stato del menu della sidebar e la funzione per aggiornarlo
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "All Snippets",
      isSelected: pathname === "/my-snippets",
      path: "/my-snippets",
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
      isSelected: pathname === "/favorites",
      path: "/favorites",
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
      isSelected: pathname === "/trash",
      path: "/trash",
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
      isSelected: pathname === "/logout",
      path: "",
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
  const [isAdding, setIsAdding] = useState(false)
  const [allTags, setAllTags] = useState<SingleTagType[]>([])

  // useEffect per sincronizzare lo stato del menu con l'URL corrente
  useEffect(() => {
    const updatedMenuItems = menuItems.map((menu) => ({
      ...menu,
      isSelected: pathname === menu.path,
    }))
    setMenuItems(updatedMenuItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
          //console.log("snippets: ", data.snippets)
          const formattedSnippets = data.snippets.map(
            (snippet: SingleSnippetTypes) => ({
              ...snippet,
              creationDate: formatDate(snippet.creationDate),
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

  // Use effect per il fetch di tutti i tag
  useEffect(() => {
    if (!clerkId) return

    const fetchAllTags = async () => {
      try {
        const response = await fetch(`/api/tags?clerkId=${clerkId}`)
        
        if (!response) {
          throw new Error("Unable to fetch tags")
        }
        const data = await response.json()
        setAllTags(data.tags)
      } catch (error) {
        console.log("Error fetching tags: ", error);
      }
    }

    fetchAllTags()
  }, [clerkId])

  // Funzione per aggiornare gli Snippet
  const updateSnippet = async (
    snippetId: number | string,
    updatedData: Partial<SingleSnippetTypes>
  ) => {
    try {
      const response = await fetch(`/api/snippets?id=${snippetId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Failed to update the snippet")
      }

      const updatedSnippet = await response.json()

      setAllSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet._id === snippetId ? { ...snippet, ...updatedData } : snippet
        )
      )
      return updatedSnippet
    } catch (error) {
      console.log(error)
      throw new Error("Failed to update the snippet")
    }
  }

  // Funzione per aggiungere snippet in db e frontend
  const addSnippet = async (snippet: Partial<SingleSnippetTypes>) => {
    const { _id, ...snippetWithoutId } = snippet

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetWithoutId),
      })

      if (!response.ok) {
        throw new Error(
          `Failed to add the new Snippet, status: ${response.status}`
        )
      }

      const data = await response.json()

      const id = data.snippets._id

      const savedSnippet = { ...data.snippets, _id: id }

      const updatedSnippets = [...allSnippets, savedSnippet]
      setAllSnippets(updatedSnippets)

      return savedSnippet
    } catch (error) {
      console.log(error)
      throw new Error("Failed to add the new Snippet")
    }
  }

  // Funzione per eliminare snippet in db e frontend
  const deleteSnippet = async (snippetId: string | number) => {
    try {
      const response = await fetch(`/api/snippets?id=${snippetId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete the snippet")
      }

      setAllSnippets((prevSnippets) =>
        prevSnippets.filter((snippet) => snippet._id !== snippetId)
      )

      return { message: "Snippet deleted successfully" }
    } catch (error) {
      console.log(error)
      throw new Error("Failed to delete the snippet")
    }
  }

  // Fuznzione per aggiungere un tag in db e frontend
  const addTag = async (tag: Partial<SingleTagType>) => {
    const { _id, ...tagWithoutId} = tag
    console.log("tag: ",tag);
    
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tagWithoutId)
      })

      if (!response.ok) {
        throw new Error(`Failed to add the new tag, status: ${response.status}`)
      }

      const data = await response.json()
      console.log("data: ",data);
      
      const id = data.tags._id
      const savedTag = { ...data.tags, _id: id }
      
      const updatedTags = [...allTags, savedTag]
      setAllTags(updatedTags)

      return savedTag
    } catch (error) {
      console.log(error)
      throw new Error("Failed to add the new Tag")
    }
  }

  // Funzione per eliminare tag in db e frontend
  const deleteTag = async (tagId: number | string) => {
    try {
      const response = await fetch(`/api/tags?id=${tagId}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error("Failed to delete the tag.")
      }

      setAllTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId))

      return {message: "Tag deleted successfully."}
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete the tag.")
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
          deleteSnippet,
        },
        SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
        addSnippetState: { isAdding, setIsAdding, addSnippet },
        TagsState: { allTags, setAllTags, addTag, deleteTag },
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

"use client"

import { Grid2X2, Heart, LogOut, Trash2, Globe } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  AppContextType,
  LanguageCountType,
  MenuItem,
  SingleSnippetTypes,
  SingleTagType,
  TagsCountType,
} from "./types/context"
import { usePathname } from "next/navigation"
import { SignOutButton, useAuth, useClerk } from "@clerk/nextjs"
import { Button } from "./components/ui/button"
import { SignOutOptions } from "@clerk/types"

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
    /* countSnippetByLanguage: async () => { }, */
    languageCount: [],
    setLanguageCount: () => {},
    tagsCount: [],
    setTagsCount: () => {},
    searchTerm: "",
    setSearchTerm: () => {},
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
    updateTag: async () => {},
  },
  SelectedTagState: {
    selectedTag: null,
    setSelectedTag: () => {},
  },
  resetContext: () => {},
})

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { signOut } = useClerk()

  const resetContext = () => {
    setAllSnippets([])
    setSelectedSnippet(null)
    setClerkId("")
    setAllTags([])
    setSelectedTag(null)
    setLanguageCount([])
    setTagsCount([])
  }

  const handleLogout = async () => {
    signOut()
    resetContext()
  }

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
      name: "Public Snippets",
      isSelected: pathname === "/public-snippets",
      path: "/public-snippets",
      icon: (
        <Globe
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
  const [selectedTag, setSelectedTag] = useState<SingleTagType[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [languageCount, setLanguageCount] = useState<LanguageCountType[]>([])
  const [tagsCount, setTagsCount] = useState<TagsCountType[]>([])

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
    if (pathname === "/public-snippets") {
      return
    }

    const fetchAllSnippets = async () => {
      try {
        const response = await fetch(`/api/snippets?clerkId=${clerkId}`)
        if (!response) {
          throw new Error("Unable to fetch code snippets")
        }
        const data = await response.json()

        if (data.snippets) {
          setAllSnippets(data.snippets)
        }
      } catch (error) {
        console.log("Error fetching snippets:", error)
      }
    }

    fetchAllSnippets().catch((error) => {
      console.log("Error in fetchAllSnippets: ", error)
    })
  }, [pathname, clerkId])

  // UseEffect per il fetch degli snippet pubblici
  useEffect(() => {
    const fetchPublicSnippets = async () => {
      try {
        const response = await fetch("/api/publicSnippets")

        if (!response.ok) {
          throw new Error("Unable to fetch public snippets")
        }

        const data = await response.json()

        if (data.snippets) {
          setAllSnippets(data.snippets)
        }
      } catch (error) {
        console.log("Error fetching public snippets: ", error)
      }
    }

    if (pathname === "/public-snippets") {
      fetchPublicSnippets()
    }
  }, [pathname])

  // useEffect fetch public languages
  useEffect(() => {
    const fetchPublicLanguages = async () => {
      try {
        const response = await fetch("/api/publicSnippets?countByLanguage=true")

        if (!response.ok) {
          throw new Error("Unable to fetch public languages")
        }

        const data = await response.json()
        const languageCountArray = data.LanguageCount

        if (Array.isArray(languageCountArray)) {
          setLanguageCount(languageCountArray)
        } else {
          console.error("Data received is not an array: ", languageCountArray)
          setLanguageCount([])
        }
      } catch (error) {
        console.log("Error fetching public languages: ", error)
        setLanguageCount([])
      }
    }

    if (pathname === "/public-snippets") {
      fetchPublicLanguages()
    }
  }, [pathname])

  // Use effect per il fetch di tutti i tag
  useEffect(() => {
    if (!clerkId) return
    if (pathname === "/public-snippets") {
      return
    }

    const fetchAllTags = async () => {
      try {
        const response = await fetch(`/api/tags?clerkId=${clerkId}`)

        if (!response) {
          throw new Error("Unable to fetch tags")
        }
        const data = await response.json()
        setAllTags(data.tags)
      } catch (error) {
        console.log("Error fetching tags: ", error)
      }
    }

    fetchAllTags().catch((error) => {
      console.log("Error in fetchAllTags:", error)
    })
  }, [clerkId, pathname])

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
    const { _id, ...tagWithoutId } = tag
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagWithoutId),
      })

      if (!response.ok) {
        throw new Error(`Failed to add the new tag, status: ${response.status}`)
      }

      const data = await response.json()

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

  // Funzione per modificare tag in db e frontend
  const updateTag = async (
    tagId: string | number,
    updateData: Partial<SingleTagType>
  ) => {
    try {
      // Aggiornamento del tag
      const response = await fetch(`/api/tags?id=${tagId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error("Failed to update the tag")
      }

      const updatedTag = await response.json()

      // Aggiornamento del tag nella collezione dei tag
      setAllTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === tagId ? { ...tag, ...updatedTag } : tag
        )
      )

      return updatedTag
    } catch (error) {
      console.log(error)
      throw new Error("Failed to update the tag")
    }
  }

  // Funzione per eliminare tag in db e frontend
  const deleteTag = async (tagId: number | string) => {
    try {
      const response = await fetch(`/api/tags?id=${tagId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete the tag.")
      }

      setAllTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId))

      return { message: "Tag deleted successfully." }
    } catch (error) {
      console.log(error)
      throw new Error("Failed to delete the tag.")
    }
  }

  // UseEffect per contare i linguaggi presenti
  useEffect(() => {
    const countSnippetByLanguage = async () => {
      if (!clerkId) return
      if (pathname === "/public-snippets") {
        return
      }

      try {
        const response = await fetch(
          `/api/snippets?clerkId=${clerkId}&countByLanguage=true`
        )

        if (!response.ok) {
          throw new Error("Failed to count snippets by language")
        }

        const result = await response.json()
        const languageCountArray = result.LanguageCount

        if (Array.isArray(languageCountArray)) {
          setLanguageCount(languageCountArray)
        } else {
          console.error("Data received is not an array: ", languageCountArray)
          setLanguageCount([])
        }
      } catch (error) {
        console.error("Error counting snippets by language: ", error)
        setLanguageCount([])
      }
    }
    if (pathname !== "/public-snippets") {
      countSnippetByLanguage().catch((error) => {
        console.log("Error in countSnippetByLanguage", error)
      })
    }
  }, [allSnippets, clerkId, pathname])

  // UseEffect per contare le tag presenti
  useEffect(() => {
    if (!clerkId) return
    if (pathname === "/public-snippets") {
      return
    }

    const countTags = async () => {
      try {
        const response = await fetch(
          `api/snippets?clerkId=${clerkId}&countTags=true`
        )

        if (!response.ok) {
          throw new Error("Failed to count number of tags")
        }

        const result = await response.json()
        const tagsCountArray = result.tagsCount

        if (Array.isArray(tagsCountArray)) {
          setTagsCount(tagsCountArray)
        } else {
          console.error("Data received is not an array: ", tagsCountArray)
          setTagsCount([])
        }
      } catch (error) {
        console.error("Error counting tags: ", error)
        setTagsCount([])
      }
    }
    countTags().catch((error) => {
      console.log("Error in countTags", error)
    })
  }, [allSnippets, clerkId, pathname])

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
          searchTerm,
          setSearchTerm,
          languageCount,
          setLanguageCount,
          tagsCount,
          setTagsCount,
        },
        SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
        addSnippetState: { isAdding, setIsAdding, addSnippet },
        TagsState: { allTags, setAllTags, addTag, deleteTag, updateTag },
        SelectedTagState: { selectedTag, setSelectedTag },
        resetContext,
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

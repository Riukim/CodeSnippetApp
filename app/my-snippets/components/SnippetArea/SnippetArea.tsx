import React, { useEffect } from "react"
import SingleSnippet from "./Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen },
    snippetsState: { allSnippets, setClerkId, setAllSnippets, searchTerm },
    addSnippetState: { isAdding },
    SelectedSnippetState: { selectedSnippet },
  } = useAppContext()

  const { user } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    if (user) {
      const clerkId = user.id
      setClerkId(clerkId)
    }
  }, [setClerkId, user])

  useEffect(() => {
    setAllSnippets((prevSnippets) =>
      prevSnippets
        .map((snippet) =>
          snippet.isTrash ? { ...snippet, isFavorite: false } : snippet
        )
        .sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        )
    )
  }, [setAllSnippets])

  const visibleSnippet = allSnippets
    .filter((snippet) => {
      const titleMatch = snippet.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      if (pathname === "/my-snippets") {
        return !snippet.isTrash && titleMatch
      } else if (pathname === "/trash") {
        return snippet.isTrash && titleMatch
      } else if (pathname === "/favorites") {
        return snippet.isFavorite && !snippet.isTrash && titleMatch
      } else {
        return titleMatch
      }
    }) // sort per ordinare la lista degli snippet, in modo che lo snippet selzionato sia sempre il primo della lista
    .sort((a, b) => {
      if (selectedSnippet && a._id === selectedSnippet._id) return -1
      if (selectedSnippet && b._id === selectedSnippet._id) return 1
      return 0
    })

  return (
    <div
      className={`grid gap-4  ${
        isOpen || isAdding
          ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
          : "grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2"
      }`}
    >
      {visibleSnippet.map((snippet) => (
        <SingleSnippet
          key={snippet._id}
          snippet={snippet}
        />
      ))}
    </div>
  )
}

export default SnippetArea

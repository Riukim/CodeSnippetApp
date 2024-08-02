import React, { useEffect } from "react"
import SingleSnippet from "./Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen },
    snippetsState: { allSnippets, setClerkId, setAllSnippets },
    addSnippetState: { isAdding },
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
      prevSnippets.map((snippet) =>
        snippet.isTrash ? { ...snippet, isFavorite: false } : snippet
      )
    )
  }, [setAllSnippets])

  const visibleSnippet = allSnippets.filter((snippet) => {
    if (pathname === "/my-snippets") {
      return !snippet.isTrash
    } else if (pathname === "/trash") {
      return snippet.isTrash
    } else if (pathname === "/favorites") {
      return snippet.isFavorite && !snippet.isTrash
    } else {
      return true
    }
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

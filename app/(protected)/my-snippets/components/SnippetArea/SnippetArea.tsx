import React, { useEffect } from "react"
import SingleSnippet from "./Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { SingleSnippetTypes } from "@/types/context"
import { Trash2, HeartCrack } from "lucide-react"

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    snippetsState: { allSnippets, setClerkId, setAllSnippets, searchTerm },
    addSnippetState: { isAdding, setIsAdding },
    SelectedSnippetState: { selectedSnippet },
    SelectedTagState: { selectedTag },
  } = useAppContext()

  const { user } = useUser()
  const pathname = usePathname()

  const handleClick = () => {
    setIsAdding(true)
    setIsOpen(false)
  }

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

  const sortByDate = (a: SingleSnippetTypes, b: SingleSnippetTypes) =>
    new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()

  const visibleSnippet = allSnippets
    .filter((snippet) => {
      const titleMatch = snippet.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const tagMatch = selectedTag?.length
        ? snippet.tags.some((tag) => tag.name === selectedTag[0]?.name)
        : true

      if (pathname === "/my-snippets") {
        return !snippet.isTrash && titleMatch && tagMatch
      } else if (pathname === "/trash") {
        return snippet.isTrash && titleMatch && tagMatch
      } else if (pathname === "/favorites") {
        return snippet.isFavorite && !snippet.isTrash && titleMatch && tagMatch
      } else {
        return titleMatch && tagMatch
      }
    }) // sort per ordinare la lista degli snippet, in modo che lo snippet selzionato sia sempre il primo della lista
    .sort(sortByDate)
    .sort((a, b) => {
      if (selectedSnippet && a._id === selectedSnippet._id) return -1
      if (selectedSnippet && b._id === selectedSnippet._id) return 1
      return 0
    })

  const noSnippets = visibleSnippet.length === 0

  return (
    <div
      className={`grid gap-4 ${
        isOpen || isAdding
          ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
          : "grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2"
      }`}
    >
      {noSnippets ? (
        <>
          <div className="flex items-center justify-center col-span-full mt-20">
            {pathname === "/my-snippets" && !isAdding && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-xl font-semibold text-primary">
                  Ready to start adding new snippets?
                </p>
                <p className="">
                  Quickly create and organize your favorite code snippets!
                </p>
                <button
                  className="bg-primary p-2 rounded-lg"
                  onClick={handleClick}
                >
                  Add New Snippet
                </button>
              </div>
            )}
            {pathname === "/favorites" && (
              <div className="flex flex-col items-center gap-5">
                <HeartCrack
                  className="text-gray-500"
                  size={36}
                />
                <p className="text-center text-gray-500">
                  No favorites yet. Add some to display them here.
                </p>
              </div>
            )}
            {pathname === "/trash" && (
              <div className="flex flex-col items-center gap-5">
                <Trash2
                  className="text-gray-500"
                  size={36}
                />
                <p className="text-center text-gray-500">The trash is empty.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        visibleSnippet.map((snippet) => (
          <SingleSnippet
            key={snippet._id}
            snippet={snippet}
          />
        ))
      )}
    </div>
  )
}

export default SnippetArea

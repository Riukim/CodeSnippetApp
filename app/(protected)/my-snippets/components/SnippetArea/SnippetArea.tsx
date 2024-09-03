"use client"

import React, { useEffect, useState } from "react"
import SingleSnippet from "./Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { SingleSnippetTypes } from "@/types/context"
import { Trash2, HeartCrack } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    snippetsState: { allSnippets, setClerkId, setAllSnippets, searchTerm },
    addSnippetState: { isAdding, setIsAdding },
    SelectedSnippetState: { selectedSnippet },
    SelectedTagState: { selectedTag },
  } = useAppContext()

  const [isMounted, setIsMounted] = useState(false)

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
    const fetchSnippets = async () => {
      setIsMounted(false)
      setAllSnippets((prevSnippets) =>
        prevSnippets.map((snippet) =>
          snippet.isTrash ? { ...snippet, isFavorite: false } : snippet
        )
      )
      setIsMounted(true)
    }
    fetchSnippets()
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
    })
    .sort(sortByDate)
    .sort((a, b) => {
      if (selectedSnippet && a._id === selectedSnippet._id) return -1
      if (selectedSnippet && b._id === selectedSnippet._id) return 1
      return 0
    })
  
  useEffect(() => {
    console.log("All Snippets:", allSnippets)
    console.log("Visible Snippets:", visibleSnippet)
  }, [allSnippets, visibleSnippet])

  if (!isMounted) {
    return (
      <div
        className={`grid gap-4 ${
          isOpen || isAdding
            ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
            : "grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2"
        }`}
      >
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    )
  }

  if (visibleSnippet.length === 0) {
    return (
      <div className="flex items-center justify-center col-span-full mt-20">
        {pathname === "/my-snippets" && !isAdding && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <p className="text-xl font-semibold text-primary">
              Ready to start?
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
    )
  }

  return (
    <div
      className={`grid gap-4 ${
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

const LoadingSkeleton = () => {
  return (
    <div className="bg-background flex flex-col flex-1 max-h-dvh rounded-lg shadow-md py-4 animate-pulse">
      {/* Placeholder per il titolo */}
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-4 mx-4"></div>
      {/* Placeholder per i tag */}
      <div className="flex gap-2 mx-4 mt-4">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-10"></div>
      </div>
      {/* Placeholder per la descrizione */}
      <div className="h-4 bg-gray-300 rounded w-3/4 my-6 mx-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 my-2 mx-4"></div>
      {/* Placeholder per il codice */}
      <div className="rounded-lg h-[50dvh] bg-gray-200 dark:bg-gray-600 mx-4 my-4 overflow-hidden text-sm shadow-md"></div>
      {/* Placeholder per il footer */}
      <div className="flex justify-between mx-4 mt-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  )
}

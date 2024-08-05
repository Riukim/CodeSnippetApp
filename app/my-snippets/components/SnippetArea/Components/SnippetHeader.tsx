"use client"

import { useAppContext } from "@/ContextApi"
import { Heart } from "lucide-react"
import React, { useEffect, useState } from "react"
import { SingleSnippetTypes } from "@/types/context"
import { formatDate } from "@/lib/formatDate"

interface SnippetHeaderProps {
  snippet: SingleSnippetTypes
}

const SnippetHeader = ({ snippet }: SnippetHeaderProps) => {
  const {
    snippetPanel: { setIsOpen },
    addSnippetState: { setIsAdding },
    SelectedSnippetState: { setSelectedSnippet },
    snippetsState: { updateSnippet },
  } = useAppContext()

  const [isFavorite, setIsFavorite] = useState(snippet.isFavorite)
  const [isTrash, setIsTrash] = useState(snippet.isTrash)

  useEffect(() => {
    setIsTrash(snippet.isTrash)
  }, [snippet.isTrash])

  const toggleFavorite = async () => {
    // se ifTrash è true la funzione non fa nulla
    if (isTrash) return

    // Toggle lo stato di isFavorite
    const newFavoriteStatus = !isFavorite
    setIsFavorite(newFavoriteStatus)

    try {
      await updateSnippet(snippet._id, { isFavorite: newFavoriteStatus })
    } catch (error) {
      console.error("Failed to update favorite status:", error)
      // Riporta lo stato al valore precedente in caso di errore
      setIsFavorite(isFavorite)
    }
  }

  const handleTitleClick = () => {
    setSelectedSnippet(snippet)
    setIsOpen(true)
    setIsAdding(false)
  }

  return (
    <>
      <div className="flex justify-between mx-4">
        <span
          className="font-bold text-lg w-[87%] hover:text-primary cursor-pointer"
          onClick={handleTitleClick}
        >
          {snippet.title}
        </span>
        <div className="pt-1">
          <Heart
            size={20}
            fill={isFavorite ? "red" : "none"}
            stroke={isFavorite ? "black" : "currentColor"}
            className={`${
              isTrash
                ? "text-muted-foreground cursor-not-allowed"
                : "hover:fill-red-600 cursor-pointer"
            }`}
            onClick={toggleFavorite}
          />
        </div>
      </div>
      <div className="text-muted-foreground text-xs flex gap-1 font-normal mx-4 mt-1">
        <span>{formatDate(new Date(snippet.creationDate))}</span>
      </div>
    </>
  )
}

export default SnippetHeader

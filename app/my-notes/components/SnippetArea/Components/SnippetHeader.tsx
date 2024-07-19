"use client"

import { useAppContext } from "@/ContextApi"
import { Heart } from "lucide-react"
import React, { useState } from "react"
import { SingleSnippetTypes } from "@/types/context"

interface SnippetHeaderProps {
  snippet: SingleSnippetTypes
}

const SnippetHeader = ({ snippet }: SnippetHeaderProps) => {
  const {
    snippetPanel: { setIsOpen },
    SelectedSnippetState: { setSelectedSnippet },
  } = useAppContext()

  const [isFavorite, setIsFavorite] = useState(snippet.isFavorite)

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite)
  }

  const handleTitleClick = () => {
    setSelectedSnippet(snippet)
    setIsOpen(true)
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
            stroke={isFavorite ? "red" : "currentColor"}
            className="cursor-pointer"
            onClick={toggleFavorite}
          />
        </div>
      </div>
      <div className="text-muted-foreground text-[12px] flex gap-1 font-normal mx-4 mt-1">
        <span>{snippet.creationDate}</span>
      </div>
    </>
  )
}

export default SnippetHeader

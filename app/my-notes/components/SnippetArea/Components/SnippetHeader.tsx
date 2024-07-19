"use client"

import { useAppContext } from '@/ContextApi'
import { Heart } from 'lucide-react'
import React, { useState } from 'react'

interface SnippetHeaderProps {
  title: string,
  date: string,
  isFavorite: boolean,
  isPublic: boolean
}

const SnippetHeader = ({ title, date, isFavorite: initialIsFavorite ,isPublic}: SnippetHeaderProps) => {
  const {
    snippetPanel: { setIsOpen },
  } = useAppContext()

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  const toggleFavorite = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite)
  }

  return (
    <>
      <div className="flex justify-between mx-4">
        <span
          className="font-bold text-lg w-[87%] hover:text-primary cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {title}
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
        <span>{date}</span>
      </div>
    </>
  )
}

export default SnippetHeader
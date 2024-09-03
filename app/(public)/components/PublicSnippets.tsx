"use client"

import SingleSnippet from "@/app/(protected)/my-snippets/components/SnippetArea/Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes } from "@/types/context"
import React, { useEffect, useState } from "react"

const PublicSnippets = () => {
  const {
    snippetsState: { allSnippets, searchTerm, setAllSnippets },
    SelectedTagState: { selectedTag },
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(true)
  const generateKey = (snippet: SingleSnippetTypes) => `${snippet.creationDate}-${snippet.title}`
  
  useEffect(() => {
    const loadingState = () => {
      if (allSnippets.length === 0) {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } else {
        setIsLoading(false)
        setAllSnippets(allSnippets)
      }
    }
    loadingState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSnippets])

  const visibleSnippet = allSnippets
    .filter((snippet) => {
      const titleMatch = snippet.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      
      const tagMatch = selectedTag?.length
        ? snippet.tags.some((tag) => tag.name === selectedTag[0]?.name)
        : true
      
    return snippet.isPublic && titleMatch && tagMatch
    })

  return (
    <div className="grid gap-4 py-5 w-full grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2">
      {isLoading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : (
        visibleSnippet.map((snippet) => (
          <SingleSnippet
            key={generateKey(snippet)}
            snippet={snippet}
          />
        ))
      )}
    </div>
  )
}

export default PublicSnippets

const LoadingSkeleton = () => {
  return (
    <div className="bg-background flex flex-col flex-1 max-sm:w-full w-auto max-h-dvh rounded-lg shadow-md py-4 animate-pulse">
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
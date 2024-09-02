"use client"

import SingleSnippet from "@/app/(protected)/my-snippets/components/SnippetArea/Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import React, { useEffect, useState } from "react"

const PublicSnippets = () => {
  const {
    snippetsState: { allSnippets, searchTerm },
    SelectedTagState: {selectedTag}
  } = useAppContext()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

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
    <div className="grid py-5 shadow-md gap-4 grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2">
      {isLoading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
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

export default PublicSnippets

const LoadingSkeleton = () => {
  return (
    <div className="bg-background flex flex-col flex-1 w-[396px] max-h-dvh rounded-lg shadow-md py-4 animate-pulse">
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
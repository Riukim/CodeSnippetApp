"use client"

import SingleSnippet from "@/app/(protected)/my-snippets/components/SnippetArea/Components/SingleSnippet"
import { useAppContext } from "@/ContextApi"
import React from "react"

const PublicSnippets = () => {
  const {
    snippetsState: { allSnippets, searchTerm },
    SelectedTagState: {selectedTag}
  } = useAppContext()

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
      {visibleSnippet.map((snippet) => (
        <SingleSnippet
          key={snippet._id}
          snippet={snippet}
        />
      ))}
    </div>
  )
}

export default PublicSnippets

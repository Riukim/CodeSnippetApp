"use client"

import React from "react"
import SnippetHeader from "./SnippetHeader"
import SnippetTags from "./SnippetTags"
import SnippetDescription from "./SnippetDescription"
import CodeSnippet from "./CodeSnippet"
import SnippetFooter from "./SnippetFooter"
import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes } from "@/types/context"

interface SingleSnippetProps {
  snippet: SingleSnippetTypes
}

const SingleSnippet = ({ snippet }: SingleSnippetProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  return (
    <div
      className={`bg-card flex flex-col flex-1 max-sm:w-full ${
        isOpen ? "w-full" : "w-auto"
      } rounded-lg shadow-md py-4`}
    >
      <div className="flex-1">
        <SnippetHeader
          title={snippet.title}
          date={snippet.creationDate}
          isFavorite={snippet.isFavorite}
          isPublic={snippet.isPublic}
        />
        <SnippetTags tags={snippet.tags} />
        <SnippetDescription description={snippet.description} />
        <CodeSnippet
          language={snippet.language}
          code={snippet.code}
        />
      </div>
      <SnippetFooter language={snippet.language} />
    </div>
  )
}

export default SingleSnippet

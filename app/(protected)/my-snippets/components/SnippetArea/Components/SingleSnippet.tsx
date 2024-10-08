"use client"

import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes } from "@/types/context"
import CodeSnippet from "./CodeSnippet"
import SnippetDescription from "./SnippetDescription"
import SnippetFooter from "./SnippetFooter"
import SnippetHeader from "./SnippetHeader"
import SnippetTags from "./SnippetTags"

interface SingleSnippetProps {
  snippet: SingleSnippetTypes
}

const SingleSnippet = ({ snippet }: SingleSnippetProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  const language =
    typeof snippet.language === "string"
      ? snippet.language.toLowerCase()
      : "plaintext"

  return (
    <div
      className={`bg-background flex flex-col flex-1 max-sm:w-full max-h-dvh ${
        isOpen ? "w-full" : "w-auto"
      } rounded-lg shadow-md py-4`}
    >
      <div className="flex-1">
        <SnippetHeader snippet={snippet} />
        <SnippetTags tags={snippet.tags} />
        <SnippetDescription
          description={snippet.description}
          code={snippet.code}
        />
        <CodeSnippet
          language={language}
          code={snippet.code}
        />
      </div>
      <SnippetFooter snippet={snippet} />
    </div>
  )
}

export default SingleSnippet

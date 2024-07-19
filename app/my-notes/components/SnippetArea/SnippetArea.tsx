import React from 'react'
import SingleSnippet from './Components/SingleSnippet'
import { useAppContext } from '@/ContextApi'

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen },
    snippetsState: { allSnippets }
  } = useAppContext()

  return (
    <div
      className={`grid gap-4  ${
        isOpen
          ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
          : "grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2"
      }`}
    >
      {allSnippets.map(snippet => (
        <SingleSnippet key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}

export default SnippetArea
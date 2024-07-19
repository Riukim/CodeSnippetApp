import React from 'react'
import SingleSnippet from './Components/SingleSnippet'
import { useAppContext } from '@/ContextApi'

const SnippetArea = () => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  return (
    <div
      className={`grid gap-4 ${
        isOpen
          ? " max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-1 grid-cols-1"
          : "grid-cols-3"
      }`}
    >
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
    </div>
  )
}

export default SnippetArea
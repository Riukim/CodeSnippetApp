"use client"

import React from 'react'
import SnippetHeader from './SnippetHeader'
import SnippetTags from './SnippetTags'
import SnippetDescription from './SnippetDescription'
import CodeSnippet from './CodeSnippet'
import SnippetFooter from './SnippetFooter'
import { useAppContext } from '@/ContextApi'

const SingleSnippet = () => {
  const {snippetPanel: {isOpen}} = useAppContext()

  return (
    <div className={`bg-card flex-1 max-sm:w-full ${isOpen ? "w-full" : "w-auto"} rounded-lg shadow-md py-4`}>
      <SnippetHeader />
      <SnippetTags />
      <SnippetDescription />
      <CodeSnippet language="javascript" />
      <SnippetFooter />
    </div>
  )
}

export default SingleSnippet
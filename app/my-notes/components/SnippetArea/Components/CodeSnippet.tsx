"use client"

import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"

import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs"

interface CodeSnippetProps {
  language: string
}

const Skeleton = () => {
  return (
    <div className="rounded-lg h-fit bg-gray-100 dark:bg-gray-700 overflow-hidden text-sm mt-4 mx-4 animate-pulse">
      <div className="bg-gray-400 h-4 w-1/4 mx-4 my-4 rounded-lg"></div>
      <div className="bg-gray-400 h-4 w-1/2 mx-4 my-2 rounded-lg"></div>
      <div className="bg-gray-400 h-4 w-1/3 mx-4 my-2 rounded-lg"></div>
      <div className="bg-gray-400 h-4 w-3/4 mx-4 my-2 rounded-lg"></div>
      <div className="bg-gray-400 h-4 w-1/2 mx-4 my-2 rounded-lg"></div>
      <div className="bg-gray-400 h-4 w-1/4 mx-4 my-4 rounded-lg"></div>
    </div>
  )
}

const CodeSnippet = ({ language }: CodeSnippetProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton />
  }

  const style = theme === "dark" ? atomOneDark : atomOneLight

  const codeSnippet = `
  import React from 'react'

  const CodeSnippet = () => {
    return (
      <div>CodeSnippet</div>
      )
    }

  export default CodeSnippet
  `

  return (
    <div className="rounded-lg overflow-hidden text-sm mt-4 mx-4 shadow-md">
      <SyntaxHighlighter
        language={language}
        style={style}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeSnippet

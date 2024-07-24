"use client"

import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"

import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"

interface CodeSnippetProps {
  language: string
  code: string
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

const CodeSnippet = ({ language, code }: CodeSnippetProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton />
  }

  const style = theme === "dark" ? vs2015 : vs

  const customStyle = {
    ...style,
    hljs: {
      ...style.hljs,
      backgroundColor: theme === "dark" ? "#27272a" : "#fafafa",
      color: theme === "dark" ? "#dcdcdc" : "#333",
    },
    "hljs-literal": {
      color: theme === "dark" ? "#D19A66" : "#a31515",
    },
    "hljs-subst": {
      color: theme === "dark" ? "#E5C07B" : "",
    },
    "hljs-params": {
      color: theme === "dark" ? "#EF596F" : "#EF596F",
    },
    "hljs-keyword": {
      color: theme === "dark" ? "#569cd6" : "#007acc",
      fontWeight: "bold",
    },
    "hljs-comment": {
      color: theme === "dark" ? "#6a9955" : "#008000",
      fontStyle: "italic",
    },
  }

  return (
    <div className="rounded-lg overflow-hidden text-sm mt-4 mx-4 shadow-md">
      <div className="max-h-[50dvh] overflow-y-auto">
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeSnippet

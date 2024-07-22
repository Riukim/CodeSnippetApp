import React from 'react'

interface SnippetTagsProps {
  tags: { name: string; clerkUserId?: string }[]
}
const SnippetTags = ({ tags }: SnippetTagsProps) => {
  return (
    <div className="text-slate-500 text-[12px] mx-4 flex-wrap flex gap-2 mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-green-100 text-green-800 p-1 rounded-lg px-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  )
}

export default SnippetTags
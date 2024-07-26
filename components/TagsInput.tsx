/* eslint-disable react/no-unescaped-entities */
import { Tag, X } from "lucide-react";
import React from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TagsInputProps {
  tags: { name: string; clerkUserId?: string }[]
  setTags: (tags: { name: string; clerkUserId?: string }[]) => void
  newTag: string
  setNewTag: (newTag: string) => void
  handleAddTag: () => void
  handleRemoveTag: (tagName: string) => void
}

const TagsInput = ({
  tags,
  setTags,
  newTag,
  setNewTag,
  handleAddTag,
  handleRemoveTag,
}: TagsInputProps) => {
  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex items-center gap-2">
        <Tag
          size={24}
          className="text-input"
        />
        <Input
          placeholder="Add new tag..."
          value={newTag}
          className="bg-secondary shadow-md border-none"
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag()
            }
          }}
        />
        <Button
          className="text-foreground"
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 ml-6">
        {tags.map((tag) => (
          <div
            key={tag.name}
            className="flex items-center gap-1 p-1 px-2 bg-green-100 rounded-lg text-xs"
          >
            <span className="text-green-800 rounded-lg ">{tag.name}</span>
            <X
              size={16}
              className="cursor-pointer text-green-800 hover:text-green-950"
              onClick={() => handleRemoveTag(tag.name)}
            />
          </div>
        ))}
      </div>
      <span className="text-input text-end text-xs">
        Press "Enter" or click "Add Tag" to add a new tag. Click on "x" to
        remove a tag.
      </span>
    </div>
  )
}

export default TagsInput

/* eslint-disable react/no-unescaped-entities */
import { Type } from "lucide-react"
import React from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useAppContext } from "@/ContextApi"

interface TitleInputProps {
  title: string
  setTitle: (title: string) => void
  updateTitle: () => void
}

const TitleInput = ({ title, setTitle, updateTitle }: TitleInputProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex items-center gap-2">
        <Type
          size={24}
          className="text-input"
        />
        <Input
          placeholder="New Title..."
          value={title}
          className="bg-secondary shadow-md border-none"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {isOpen ? (
        <span className="text-input text-end text-xs">
          Enter a new title for your snippet and click "Update Title" to save
          the changes.
        </span>
      ) : (
        <span className="text-input text-end text-xs">
          Enter a new title for your snippet.
        </span>
      )}

      {isOpen && (
        <div className="flex justify-end mt-2">
          <Button
            className="text-foreground"
            size="sm"
            onClick={updateTitle}
          >
            Update Title
          </Button>
        </div>
      )}
    </div>
  )
}

export default TitleInput

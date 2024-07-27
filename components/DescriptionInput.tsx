/* eslint-disable react/no-unescaped-entities */
import { BookText } from "lucide-react"
import React from "react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useAppContext } from "@/ContextApi"

interface DescriptionInputProps {
  description: string
  setDescription: (description: string) => void
  updateDescription: () => void
}

const DescriptionInput = ({
  description,
  setDescription,
  updateDescription,
}: DescriptionInputProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex items-start gap-2">
        <BookText
          size={24}
          className="text-input mt-1"
        />
        <Textarea
          placeholder="New Description..."
          value={description}
          className="bg-secondary shadow-md border-none"
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>
      {isOpen ? (
        <span className="text-input text-end text-xs">
          Enter a new description for your snippet and click "Update
          Description" to save the changes.
        </span>
      ) : (
        <span className="text-input text-end text-xs">
          Enter a new description for your snippet.
        </span>
      )}
      {isOpen && (
        <div className="flex justify-end mt-2">
          <Button
            className="text-foreground"
            size="sm"
            onClick={updateDescription}
          >
            Update Description
          </Button>
        </div>
      )}
    </div>
  )
}

export default DescriptionInput

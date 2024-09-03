/* eslint-disable react/no-unescaped-entities */
import { Tag, X } from "lucide-react"
import TagsCombobox from "./TagsCombobox"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface TagsInputProps {
  tags: { name: string; clerkUserId?: string }[]
  setTags: (tags: { name: string; clerkUserId?: string }[]) => void
  newTag: string
  setNewTag: (newTag: string) => void
  handleAddTag: () => void
  handleRemoveTag: (tagName: string) => void
  handleAddTagFromCombobox: (tagName: string) => void
  errorMessage: string
  setErrorMessage: (message: string) => void
}

const TagsInput = ({
  tags,
  newTag,
  setNewTag,
  handleAddTag,
  handleRemoveTag,
  handleAddTagFromCombobox,
  errorMessage,
  setErrorMessage,
}: TagsInputProps) => {
  const handleTagSelect = (tagName: string) => {
    if (!tags.some((tag) => tag.name === tagName)) {
      //console.log("Tag name dopo select: ", tagName)
      handleAddTagFromCombobox(tagName)
      setErrorMessage("")
    } else {
      setErrorMessage("Tag already exists!")
      setTimeout(() => setErrorMessage(""), 5000)
      return
    }
  }

  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex items-center gap-2">
        <Tag
          size={24}
          className="text-input flex-none"
        />
        <Input
          placeholder="Add new tag..."
          value={newTag}
          className="bg-secondary shadow-md border-none w-[50%] "
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag()
            }
          }}
        />
        <TagsCombobox onTagSelect={handleTagSelect} />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 px-8">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-2 px-8">
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
        Select a tag from the dropdown menu or type a new tag and press "Enter"
        or "Add tag" to add a new tag
      </span>
      <div className="flex justify-end">
        <Button
          className="text-foreground"
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
      </div>
    </div>
  )
}

export default TagsInput

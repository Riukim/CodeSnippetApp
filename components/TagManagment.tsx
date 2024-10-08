"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/ContextApi"
import { Pencil, Plus, SearchIcon, TagIcon, X } from "lucide-react"
import { useState } from "react"
import { v7 as uuidv7 } from "uuid"

const TagManagment = () => {
  const {
    snippetsState: { clerkId, tagsCount },
    TagsState: { allTags, setAllTags, addTag, deleteTag, updateTag },
  } = useAppContext()

  const [searchTerm, setSearchTerm] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddingOpen, setIsAddingOpen] = useState(false)
  const [editTagId, setEditTagId] = useState<string | number>("")
  const [editTagName, setEditTagName] = useState<string>("")
  const [tagError, setTagError] = useState<Record<string, string>>({})

  const handleAddTag = async () => {
    if (newTagName.trim() !== "") {
      const tagExist = allTags.some(
        (tag) => tag.name.toLowerCase() === newTagName.toLowerCase()
      )

      if (tagExist) {
        setErrorMessage("Tag already exists!")
        return
      }

      try {
        const newTag = {
          id: uuidv7(),
          name: newTagName,
          clerkUserId: clerkId,
        }
        const savedTag = await addTag(newTag)
        setAllTags([...allTags, savedTag])
        setNewTagName("")
        setIsAddingOpen(false)
        setErrorMessage("")
      } catch (error) {
        console.error("Error adding tag: ", error)
        setErrorMessage("Error adding tag. Please try again.")
      }
    } else {
      setErrorMessage("Tag name cannot be empty!")
    }
  }

  const handleUpdateClick = async (
    tagId: string | number,
    currentName: string
  ) => {
    setEditTagId(tagId)
    setEditTagName(currentName)
    setIsEditOpen(true)
  }

  const handleUpdate = async () => {
    if (editTagName.trim() !== "") {
      // Controllo se il nome è uguale al tag attuale
      const currentTag = allTags.find((tag) => tag._id === editTagId)
      if (
        currentTag &&
        currentTag.name.toLowerCase() === editTagName.toLowerCase()
      ) {
        setErrorMessage("The tag name has not changed!")
        setTimeout(() => setErrorMessage(""), 2500)
        return
      }

      // controllo se esiste giò un altro tag con lo stesso nome
      const tagExist = allTags.some(
        (tag) =>
          tag.name.toLowerCase() === editTagName.toLowerCase() &&
          tag._id !== editTagId
      )

      if (tagExist) {
        setErrorMessage("Tag with this name already exists!")
        setTimeout(() => setErrorMessage(""), 2500)
        return
      }

      const currentTagCount = getTagCount(currentTag!.name)
      if (currentTagCount > 0) {
        setErrorMessage("Tag cannot be modified because it's in use.")
        setTimeout(() => setErrorMessage(""), 2500)
        return
      }

      try {
        await updateTag(editTagId, { name: editTagName })

        setAllTags((prevTags) =>
          prevTags.map((tag) =>
            tag._id === editTagId ? { ...tag, name: editTagName } : tag
          )
        )

        setEditTagId("")
        setEditTagName("")
        setIsEditOpen(false)
        setErrorMessage("")
      } catch (error) {
        console.error("Error updating tag:", error)
        setErrorMessage("Error updating tag. Please try again.")
      }
    } else {
      setErrorMessage("Tag name cannot be empty!")
    }
  }

  const handleDelete = async (tagId: string | number) => {
    const currentTagCount = getTagCount(
      allTags.find((tag) => tag._id === tagId)?.name || ""
    )
    if (currentTagCount > 0) {
      setTagError((prev) => ({
        ...prev,
        [tagId]: "Tag cannot be deleted because it's in use.",
      }))
      setTimeout(() => setTagError((prev) => ({ ...prev, [tagId]: "" })), 2500)
      return
    }

    try {
      await deleteTag(tagId)
      setAllTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId))
    } catch (error) {
      console.error("Error deleting tag: ", error)
      setErrorMessage("Error deleting tag, please try again")
    }
  }

  const getTagCount = (tagName: string) => {
    const tag = tagsCount.find((tag) => tag._id === tagName)
    return tag ? tag.count : 0
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground h-[33px]"
        >
          <Plus
            size={18}
            strokeWidth={3}
          />
          <span className="font-semibold">Tag</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 px-4">
            <TagIcon
              size={18}
              className="mt-1 text-green-800"
            />
            <DialogTitle>Tags Managment</DialogTitle>
          </div>
          <DialogDescription className="px-4">
            Use this section to manage and organize your tags. You can search
            for existing tags or add new ones.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center px-4 gap-4 mt-4">
          <SearchIcon
            size={18}
            className="text-green-800"
          />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search a tag..."
            className="flex-1 focus-visible:ring-transparent"
          />

          {/* Dialog per inserire una nuova Tag */}
          <Dialog
            open={isAddingOpen}
            onOpenChange={setIsAddingOpen}
          >
            <DialogTrigger asChild>
              <Button
                size="default"
                className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground"
                onClick={() => setIsAddingOpen(true)}
              >
                <Plus
                  size={18}
                  strokeWidth={3}
                />
                <span className="font-semibold">Tag</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center gap-2 px-4">
                  <TagIcon
                    size={18}
                    className=" text-green-800"
                  />
                  <DialogTitle>Add a new Tag</DialogTitle>
                </div>
                <DialogDescription className="px-4">
                  Provide a name for your new tag. This will help categorize
                  your snippets effectively.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center px-4 gap-2">
                <Input
                  placeholder="Add new tag..."
                  value={newTagName}
                  className="flex-1 focus-visible:ring-transparent"
                  onChange={(e) => setNewTagName(e.target.value)}
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
              {errorMessage && (
                <p className="px-4 text-red-600 text-sm">{errorMessage}</p>
              )}
            </DialogContent>
          </Dialog>

          {/* Dialog per modificare una Tag */}
          <Dialog
            open={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open)
              if (!open) {
                setEditTagId("")
                setEditTagName("")
                setErrorMessage("")
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center gap-2 px-4">
                  <TagIcon
                    size={18}
                    className="text-green-800"
                  />
                  <DialogTitle>Edit Tag</DialogTitle>
                </div>
                <DialogDescription className="px-4">
                  Update the name of the tag.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center px-4 gap-2">
                <Input
                  placeholder="Tag name..."
                  value={editTagName}
                  className="flex-1 focus-visible:ring-transparent"
                  onChange={(e) => setEditTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdate()
                    }
                  }}
                />
                <Button
                  className="text-foreground"
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </div>
              {errorMessage && (
                <p className="px-4 text-red-600 text-sm">{errorMessage}</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto border-b">
          {allTags
            .filter((tag) =>
              tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((tag, index) => (
              <div
                key={`${tag.name}-${index}`}
                className="flex flex-col p-2 rounded-lg bg-secondary mb-2"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded-lg px-2">
                    {tag.name} ({getTagCount(tag.name)})
                  </span>
                  <div className="flex gap-2">
                    <div className="p-2 rounded-full bg-green-100 cursor-pointer">
                      <Pencil
                        size={16}
                        className="text-green-800"
                        onClick={() => handleUpdateClick(tag._id, tag.name)}
                      />
                    </div>
                    <div className="p-2 rounded-full hover:bg-red-400 bg-green-100 cursor-pointer">
                      <X
                        size={16}
                        className="text-green-800"
                        onClick={() => handleDelete(tag._id)}
                      />
                    </div>
                  </div>
                </div>
                {tagError[tag._id] && (
                  <p className="text-red-600 text-sm mt-1">
                    {tagError[tag._id]}
                  </p>
                )}
              </div>
            ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TagManagment

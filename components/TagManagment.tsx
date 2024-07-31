"use client"

import React, { useState } from "react"
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
import { Pencil, Plus, SearchIcon, TagIcon, X } from "lucide-react"
import { useAppContext } from "@/ContextApi"
import { v7 as uuidv7 } from "uuid"

const TagManagment = () => {
  const {
    snippetsState: { clerkId },
    TagsState: { allTags, setAllTags, addTag, deleteTag },
  } = useAppContext()

  const [searchTerm, setSearchTerm] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        setIsDialogOpen(false)
        setErrorMessage("")
      } catch (error) {
        console.error("Error adding tag: ", error)
        setErrorMessage("Error adding tag. Please try again.")
      }
    } else {
      setErrorMessage("Tag name cannot be empty!")
    }
  }

  const handleDelete = async (tagId: string | number) => {
    try {
      await deleteTag(tagId)
      setAllTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId))
    } catch (error) {
      console.error("Error deleting tag: ", error)
      setErrorMessage("Error deleting tag, please try again")
    }
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
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                size="default"
                className="rounded-md px-4 flex gap-1 items-center justify-center text-foreground"
                onClick={() => setIsDialogOpen(true)}
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
        </div>
        <div className="p-4 max-h-80 overflow-y-auto border-b">
          {allTags
            .filter((tag) =>
              tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((tag) => (
              <div
                key={tag._id}
                className="flex justify-between items-center p-2 rounded-lg bg-secondary mb-2"
              >
                <span className="bg-green-100 text-green-800 p-1 rounded-lg px-2">
                  {tag.name}
                </span>
                <div className="flex gap-2">
                  <div className="p-2 rounded-full bg-green-100 cursor-pointer">
                    <Pencil
                      size={16}
                      className="text-green-800"
                      onClick={() => {}}
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

"use client"

import React, { useState } from "react"
import { useAppContext } from "@/ContextApi"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import LanguageSelector from "@/components/LanguageSelector"
import TagsInput from "@/components/TagsInput"
import TitleInput from "@/components/TitleInput"
import DescriptionInput from "@/components/DescriptionInput"
import CodeEditor from "@/components/CodeEditor"
import { X } from "lucide-react"
import { v7 as uuidv7 } from "uuid"

const AddSnippet = () => {
  const {
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets, clerkId },
    addSnippetState: { isAdding, setIsAdding, addSnippet },
  } = useAppContext()

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [tags, setTags] = useState<{ name: string }[]>([])
  const [newTag, setNewTag] = useState<string>("")

  const handleAddSnippet = async () => {
    setIsAdding(true)

    try {
      const newSnippet = {
        id: uuidv7(),
        creationDate: new Date().toISOString(),
        title,
        description,
        code,
        language,
        tags: tags.map((tag) => ({
          ...tag,
          clerkUserId: clerkId,
        })),
        clerkUserId: clerkId,
      }

      const savedSnippet = await addSnippet(newSnippet)

      setAllSnippets([...allSnippets, savedSnippet])
      setIsAdding(false)
      setTitle("")
      setDescription("")
      setCode("")
      setLanguage("")
      setNewTag("")
    } catch (error) {
      console.error("Failed to add snippet:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { name: newTag.trim() }])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagName: string) => {
    setTags(tags.filter((tag) => tag.name !== tagName))
  }

  return (
    <div
      className={`bg-background shadow-md p-3 h-fit rounded-lg ${
        isAdding ? "block" : "hidden"
      } 
      ${isMobile ? "absolute left-8 right-8 top-8" : "w-1/2"}`}
    >
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg mb-2">Add a New Snippet</h2>
          <X
            className="hover:text-primary cursor-pointer"
            onClick={() => {
              setIsAdding(false)
              setTitle("")
              setDescription("")
              setCode("")
              setLanguage("")
              setNewTag("")
            }}
          />
        </div>

        <TitleInput
          title={title}
          setTitle={setTitle}
          updateTitle={() => {}}
        />
        <Separator className="mt-2 bg-input" />

        <TagsInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
        <Separator className="mt-2 bg-input" />

        <DescriptionInput
          description={description}
          setDescription={setDescription}
          updateDescription={() => {}}
        />
        <Separator className="mt-2 bg-input" />

        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          updateLanguage={() => {}}
        />
        <Separator className="mt-2 bg-input" />

        <CodeEditor
          code={code}
          language={language}
          setCode={setCode}
          updateCode={() => {}}
        />

        <div className="flex justify-end mt-4">
          <Button onClick={handleAddSnippet}>Add Snippet</Button>
        </div>
      </div>
    </div>
  )
}

export default AddSnippet
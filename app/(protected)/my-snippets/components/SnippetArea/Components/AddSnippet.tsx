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
import { SingleTagType } from "@/types/context"

const AddSnippet = () => {
  const {
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets, clerkId },
    addSnippetState: { isAdding, setIsAdding, addSnippet },
    TagsState: { allTags, addTag, setAllTags },
  } = useAppContext()

  const [title, setTitle] = useState<string>("")
  const [titleError, setTitleError] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [codeError, setCodeError] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [languageError, setLanguageError] = useState<string>("")
  const [tags, setTags] = useState<{ name: string }[]>([])
  const [newTag, setNewTag] = useState<string>("")
  const [tagsError, setTagsError] = useState("")

  const handleAddSnippet = async () => {
    let isValid = true

    setTitleError("")
    setDescriptionError("")
    setCodeError("")
    setLanguageError("")

    if (!title) {
      setTitleError("Title is required!")
      isValid = false
      setTimeout(() => setTitleError(""), 5000)
    }

    if (!description) {
      setDescriptionError("Description is required!")
      isValid = false
      setTimeout(() => setDescriptionError(""), 5000)
    }

    if (!code) {
      setCodeError("Code is required!")
      isValid = false
      setTimeout(() => setCodeError(""), 5000)
    }

    if (!language) {
      setLanguageError("Please select a language!")
      isValid = false
      setTimeout(() => setLanguageError(""), 5000)
    }

    if (!isValid) return
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

      const sortedSnippets = [...allSnippets, savedSnippet].sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      )

      setAllSnippets(sortedSnippets)
      setIsAdding(false)
      setTitle("")
      setDescription("")
      setCode("")
      setLanguage("")
      setTags([])
      setNewTag("")
    } catch (error) {
      console.error("Failed to add snippet:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleAddTag = async () => {
    if (newTag.trim() !== "") {
      // Verifica se il tag esiste già nello snippet
      if (tags.some((tag) => tag.name === newTag.trim())) {
        setTagsError("Tag already exists!")
        setTimeout(() => setTagsError(""), 5000)
        return
      }
      //console.log("nuova tag: ", newTag)

      try {
        let existingTag = allTags.find(
          (tag) => tag.name.toLowerCase() === newTag.trim().toLowerCase()
        )
        //console.log("existingTag: ", existingTag)

        if (!existingTag) {
          const newTagData: SingleTagType = await addTag({
            name: newTag.trim(),
            clerkUserId: clerkId,
          })
          //console.log("newTagData: ", newTagData)

          const updatedTags = [...allTags, newTagData]
          setAllTags(updatedTags)
          //console.log("allTags: ", updatedTags)
          existingTag = newTagData
          //console.log("existingTag2: ", newTagData)
        }

        // Assicurati che existingTag non sia undefined prima di aggiungerlo
        if (existingTag) {
          const updatedTags = [...tags, existingTag]
          console.log("UpdatedTags: ", updatedTags)

          setTags(updatedTags)
          //console.log("Tags: ", tags)
          setNewTag("")
          setTagsError("")
        }
      } catch (error) {
        console.error("Error adding tag to snippet:", error)
        setTagsError("Error adding tag. Please try again.")
      }
    }
  }

  const handleAddTagFromCombobox = (tagName: string) => {
    if (tagName.trim()) {
      if (tags.some((tag) => tag.name === tagName.trim())) {
        setTagsError("Tag already exists!")
        setTimeout(() => setTagsError(""), 5000)
        return
      }
      const updatedTags = [...tags, { name: tagName.trim() }]
      setTags(updatedTags)
      setTagsError("")
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
              setTags([])
              setNewTag("")
            }}
          />
        </div>

        <TitleInput
          title={title}
          setTitle={setTitle}
          updateTitle={() => {}}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        <TagsInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          errorMessage={tagsError}
          handleAddTagFromCombobox={handleAddTagFromCombobox}
          setErrorMessage={setTagsError}
        />
        <Separator className="mt-2 bg-input" />

        <DescriptionInput
          description={description}
          setDescription={setDescription}
          updateDescription={() => {}}
        />
        {descriptionError && (
          <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          updateLanguage={() => {}}
        />
        {languageError && (
          <p className="text-red-500 text-sm mt-1">{languageError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        <CodeEditor
          code={code}
          language={language}
          setCode={setCode}
          updateCode={() => {}}
        />
        {codeError && (
          <p className="text-red-500 text-sm mt-1">{codeError}</p>
        )}

        <div className="flex justify-end mt-4">
          <Button
            className="text-foreground"
            onClick={handleAddSnippet}
          >
            Add Snippet
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddSnippet

/* eslint-disable react/no-unescaped-entities */
"use client"

import TagsInput from "@/components/TagsInput"
import TitleInput from "@/components/TitleInput"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes, SingleTagType } from "@/types/context"
import { useMonaco } from "@monaco-editor/react"
import { useEffect, useState } from "react"

import CodeEditor from "@/components/CodeEditor"
import DescriptionInput from "@/components/DescriptionInput"
import LanguageSelector from "@/components/LanguageSelector"
import { X } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets, updateSnippet, clerkId },
    SelectedSnippetState: { selectedSnippet },
    TagsState: { allTags, setAllTags, addTag },
  } = useAppContext()

  const { theme } = useTheme()
  const monaco = useMonaco()

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetTypes | undefined
  >(undefined)
  const [title, setTitle] = useState<string>("")
  const [titleError, setTitleError] = useState<string>("")
  const [description, setDescritpion] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [codeError, setCodeError] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [languageError, setLanguageError] = useState<string>("")
  const [tags, setTags] = useState<{ name: string; clerkUserId?: string }[]>([])
  const [newTag, setNewTag] = useState<string>("")
  const [tagsError, setTagsError] = useState("")
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const pathname = usePathname()
  useEffect(() => {
    setIsOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // UseEffect per impostare valori iniziali quando si apre per modificare snippet
  useEffect(() => {
    if (isOpen && selectedSnippet) {
      setSingleSnippet(selectedSnippet)
      setTitle(selectedSnippet.title)
      setDescritpion(selectedSnippet.description)
      setCode(selectedSnippet.code)
      setLanguage(selectedSnippet.language)
      setTags(selectedSnippet.tags)
      setIsPublic(selectedSnippet.isPublic)
    }
  }, [isOpen, selectedSnippet])

  // Funzione per aggiornare nel db e in frontend gli snippet
  const updateField = async (field: string, value: any) => {
    if (!singleSnippet) return

    const updatedData = { [field]: value }

    try {
      await updateSnippet(singleSnippet._id, updatedData)

      const newAllSnippets = allSnippets.map((snippet) => {
        if (snippet._id === singleSnippet._id) {
          return { ...snippet, ...updatedData }
        }
        return snippet
      })

      setSingleSnippet({ ...singleSnippet, ...updatedData })
      setAllSnippets(newAllSnippets)
      if (field === "tags") setTags(value)
    } catch (error) {
      console.error(
        `Failed to update the snippet ${field} in the database:`,
        error
      )
    }
  }

  const validateField = (field: string) => {
    let isValid = true

    setTitleError("")
    setDescriptionError("")
    setCodeError("")
    setLanguageError("")

    if (field === "title" && !title) {
      setTitleError("Title is required!")
      isValid = false
      setTimeout(() => setTitleError(""), 5000)
    }
    if (field === "description" && !description) {
      setDescriptionError("Description is required!")
      isValid = false
      setTimeout(() => setDescriptionError(""), 5000)
    }
    if (field === "code" && !code) {
      setCodeError("Code is required!")
      isValid = false
      setTimeout(() => setCodeError(""), 5000)
    }
    if (field === "language" && !language) {
      setLanguageError("Please select a language!")
      isValid = false
      setTimeout(() => setLanguageError(""), 5000)
    }

    if (isValid) {
      updateField(field, eval(field))
    }
  }

  const updateTitle = () => validateField("title")
  const updateDescription = () => validateField("description")
  const updateLanguage = () => validateField("language")
  const updateCode = () => validateField("code")

  const handleAddTag = async () => {
    if (newTag.trim() !== "") {
      // Verifica se il tag esiste già nello snippet
      if (tags.some((tag) => tag.name === newTag.trim())) {
        setTagsError("Tag already exists!")
        setTimeout(() => setTagsError(""), 5000)
        return
      }
      console.log("nuova tag: ", newTag)

      try {
        let existingTag = allTags.find(
          (tag) => tag.name.toLowerCase() === newTag.trim().toLowerCase()
        )
        console.log("existingTag: ", existingTag)

        if (!existingTag) {
          const newTagData: SingleTagType = await addTag({
            name: newTag.trim(),
            clerkUserId: clerkId,
          })
          console.log("newTagData: ", newTagData)

          const updatedTags = [...allTags, newTagData]
          setAllTags(updatedTags)
          console.log("allTags: ", updatedTags)
          existingTag = newTagData
          console.log("existingTag2: ", newTagData)
        }

        // Assicurati che existingTag non sia undefined prima di aggiungerlo
        if (existingTag) {
          const updatedTags = [...tags, existingTag]
          console.log("UpdatedTags: ", updatedTags)

          updateField("tags", updatedTags)
          setTags(updatedTags)
          console.log("Tags: ", tags)
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
      updateField("tags", updatedTags)
      setTags(updatedTags)
      setTagsError("")
    }
  }

  const handleRemoveTag = (tagName: string) => {
    const updateTags = tags.filter((tag) => tag.name !== tagName)
    updateField("tags", updateTags)
  }

  const handleIsPublicChange = async (checked: boolean) => {
    setIsPublic(checked)
    await updateField("isPublic", checked)
  }

  // Monaco Editor custom colors
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("atomOneDark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#27272a",
          "editor.foreground": "#abb2bf",
          "editorCursor.foreground": "#528bff",
          "editor.lineHighlightBackground": "#27272a",
          "editorLineNumber.foreground": "#636d83",
          "editor.selectionBackground": "#3e4451",
          "editor.inactiveSelectionBackground": "#3a3f4b",
        },
      })
      monaco.editor.defineTheme("atomOneLight", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#fafafa",
          "editor.foreground": "#383a42",
          "editorCursor.foreground": "#528bff",
          "editor.lineHighlightBackground": "#fafafa",
          "editorLineNumber.foreground": "#d4d4d4",
          "editor.selectionBackground": "#cceae7",
          "editor.inactiveSelectionBackground": "#e5ebf1",
        },
      })
      monaco.editor.setTheme(theme === "dark" ? "atomOneDark" : "atomOneLight")
    }
  }, [monaco, theme])

  return (
    <div
      className={`bg-background shadow-md p-3 h-fit rounded-lg ${
        isOpen ? "block" : "hidden"
      }  
        ${isMobile ? "absolute left-8 right-8 top-8" : "w-1/2"}
      `}
    >
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg mb-2">Modify your Snippet</h2>
          <X
            className="hover:text-primary cursor-pointer"
            onClick={() => {
              setIsOpen(false)
            }}
          />
        </div>

        {/* Input per modificare il titolo */}
        <TitleInput
          title={title}
          setTitle={setTitle}
          updateTitle={updateTitle}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        {/* Input per aggiungere/togliere tag */}
        <TagsInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          handleAddTagFromCombobox={handleAddTagFromCombobox}
          errorMessage={tagsError}
          setErrorMessage={setTagsError}
        />
        <Separator className="mt-2 bg-input" />

        {/* Textarea per modificare la descrizione dello snippet */}
        <DescriptionInput
          description={description}
          setDescription={setDescritpion}
          updateDescription={updateDescription}
        />
        {descriptionError && (
          <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        {/* Combobox per modificare il linguaggio di programmazione */}
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          updateLanguage={updateLanguage}
        />
        {languageError && (
          <p className="text-red-500 text-sm mt-1">{languageError}</p>
        )}
        <Separator className="mt-2 bg-input" />

        {/* Monaco Editor per modificare il codice */}
        <CodeEditor
          code={code}
          language={language}
          setCode={setCode}
          updateCode={updateCode}
        />
        {codeError && <p className="text-red-500 text-sm mt-1">{codeError}</p>}
        <Separator className="mt-2 bg-input" />

        <div className="flex flex-col">
          <div className="flex items-center mt-4 justify-end">
            <span className="mr-4">Set Public Snippet</span>
            <Switch
              checked={isPublic}
              onCheckedChange={handleIsPublicChange}
            />
          </div>
          <span className="text-input text-end mt-2 text-xs">
            Set your snippet public so other people can see it.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModifySnippet

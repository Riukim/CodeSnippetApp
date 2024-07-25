/* eslint-disable react/no-unescaped-entities */
"use client"

import { useAppContext } from "@/ContextApi"
import React, { useEffect, useState } from "react"
import { SingleSnippetTypes } from "@/types/context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Editor, { useMonaco } from "@monaco-editor/react"

import { z } from "zod"
import { snippetFormSchema } from "@/schema/snippetFormSchema"
import { useTheme } from "next-themes"
import { BookText, Code, Type, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import LanguageCombobox from "@/components/LanguageCombobox"

type SnippetFormValues = z.infer<typeof snippetFormSchema>

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets, updateSnippet },
    SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
  } = useAppContext()

  const { theme } = useTheme()
  const monaco = useMonaco()

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetTypes | undefined
  >(undefined)
  const [title, setTitle] = useState<string>("")
  const [description, setDescritpion] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [language, setLanguage] = useState<string>("")

  // UseEffect per impostare valori iniziali quando si apre per modificare snippet
  useEffect(() => {
    if (isOpen && selectedSnippet) {
      setSingleSnippet(selectedSnippet)
      setTitle(selectedSnippet.title)
      setDescritpion(selectedSnippet.description)
      setCode(selectedSnippet.code)
      setLanguage(selectedSnippet.language)
    }
  }, [isOpen, selectedSnippet])

  // Funzione per aggiornare nel db e in frontend gli snippet
  const updateField = async (field: string, value: string) => {
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
      
    } catch (error) {
      console.error(
        `Failed to update the snippet ${field} in the database:`,
        error
      )
    }
  }
  
  const updateTitle = () => updateField("title", title)
  const updateDescription = () => updateField("description", description)
  const updateLanguage = () => updateField("language", language)
  const updateCode = () => updateField("code", code)
  
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
      className={`bg-background shadow-md p-3 h-auto rounded-lg ${
        isOpen ? "block" : "hidden"
      }  
        ${
          isMobile
            ? "absolute left-8 right-8 top-8"
            : "w-1/2"
        }
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
          <span className="text-input text-end text-xs">
            Enter a new title for your snippet and click "Update Title" to save
            the changes.
          </span>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            onClick={updateTitle}
            className="text-foreground"
            size="sm"
          >
            Update Title
          </Button>
        </div>
        <Separator className="mt-2 bg-input" />

        {/* Textarea per modificare la descrizione dello snippet */}
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
              onChange={(e) => setDescritpion(e.target.value)}
              rows={5}
            />
          </div>
          <span className="text-input text-end text-xs">
            Enter a new description for your snippet and click "Update
            Description" to save the changes.
          </span>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            onClick={updateDescription}
            className="text-foreground"
            size="sm"
          >
            Update Description
          </Button>
        </div>
        <Separator className="mt-2 bg-input" />

        {/* Combobox per modificare il linguaggio di programmazione */}
        <div className="flex mt-4 gap-2 items-center justify-between">
          <LanguageCombobox
            language={language}
            onChange={setLanguage}
          />
          <Button
            size="sm"
            className="text-foreground"
            onClick={updateLanguage}
          >
            Change Language
          </Button>
        </div>

        {/* Monaco Edito per modifcare il codice */}
        <div className="flex mt-4 gap-2">
          <Code
            size={24}
            className="text-input mt-1 flex-none"
          />
          <Editor
            height="30vh"
            theme={theme === "dark" ? "atomOneDark" : "atomOneLight"}
            options={{
              dropIntoEditor: {
                enabled: true,
              },
              fontSize: 14,
              minimap: {
                enabled: false,
              },
              wordWrap: "on",
              lineNumbersMinChars: 3,
              autoClosingQuotes: "languageDefined",
              autoIndent: "full",
              formatOnType: true,
              formatOnPaste: true,
              automaticLayout: true,
            }}
            defaultLanguage="javscript"
            language={language.toLowerCase()}
            value={code}
            onChange={(newValue) => setCode(newValue || "")}
            className="rounded-lg overflow-hidden w-auto"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={updateCode}
            className="mt-4 text-foreground"
            size="sm"
          >
            Update Code
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ModifySnippet

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
import { X } from "lucide-react"

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

  // UseEffect per impostare valori iniziali quando si apre per modificare snippet
  useEffect(() => {
    if (isOpen && selectedSnippet) {
      setSingleSnippet(selectedSnippet)
      setTitle(selectedSnippet.title)
      setDescritpion(selectedSnippet.description)
      setCode(selectedSnippet.code)
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
      setIsOpen(false)
    } catch (error) {
      console.error(
        `Failed to update the snippet ${field} in the database:`,
        error
      )
    }
  }

  const updateTitle = () => updateField("title", title)
  const updateDescription = () => updateField("description", description)
  const updateCode = () => updateField("code", code)

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
      className={`bg-background shadow-md p-3 h-dvh rounded-lg ${
        isOpen ? "block" : "hidden"
      }  
        ${
          isMobile
            ? "absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : ""
        }
        ${isMobile ? "w-4/5" : "w-1/2"}
      `}
    >
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg mb-2">Modify your Snippet</h2>
          <X
            className="hover:text-primary cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <Input
          placeholder="New Title..."
          value={title}
          className="mt-4 bg-secondary shadow-md border-none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={updateTitle}
            className="mt-4  text-foreground"
            size="sm"
          >
            Update Title
          </Button>
        </div>

        <Textarea
          placeholder="New Description..."
          value={description}
          className="mt-4 bg-secondary shadow-md border-none"
          onChange={(e) => setDescritpion(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end">
          <Button
            onClick={updateDescription}
            className="mt-4 text-foreground"
            size="sm"
          >
            Update Description
          </Button>
        </div>

        <Editor
          height="40vh"
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
          defaultLanguage="javascript"
          value={code}
          onChange={(newValue) => setCode(newValue || "")}
          className="mt-4 rounded-lg overflow-hidden"
        />
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
      <div
        onClick={() => setIsOpen(false)}
        className="cursor-pointer mt-2"
      >
        Close
      </div>
    </div>
  )
}

export default ModifySnippet

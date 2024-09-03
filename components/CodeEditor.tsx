/* eslint-disable react/no-unescaped-entities */
import { useAppContext } from "@/ContextApi"
import { Editor, useMonaco } from "@monaco-editor/react"
import { Code } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { Button } from "./ui/button"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  language: string
  updateCode: () => void
}

const CodeEditor = ({
  code,
  setCode,
  language,
  updateCode,
}: CodeEditorProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  const { theme } = useTheme()
  const monaco = useMonaco()

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
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex mt-4 gap-2">
        <Code
          size={24}
          className="text-input mt-1 flex-none"
        />
        <Editor
          height="30vh"
          theme={theme === "dark" ? "atomOneDark" : "atomOneLight"}
          options={{
            dropIntoEditor: { enabled: true },
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            lineNumbersMinChars: 3,
            autoClosingQuotes: "languageDefined",
            autoIndent: "full",
            formatOnType: true,
            formatOnPaste: true,
            automaticLayout: true,
          }}
          defaultLanguage="javascript"
          language={language.toLowerCase()}
          value={code}
          onChange={(newValue) => setCode(newValue || "")}
          className="rounded-lg overflow-hidden w-auto"
        />
      </div>
      {isOpen ? (
        <span className="text-input text-end text-xs">
          Enter or modify the code for your snippet and click "Update Code" to
          save the changes.
        </span>
      ) : (
        <span className="text-input text-end text-xs">
          Enter the code for your snippet.
        </span>
      )}
      {isOpen && (
        <div className="flex justify-end">
          <Button
            onClick={updateCode}
            className="mt-4 text-foreground"
            size="sm"
          >
            Update Code
          </Button>
        </div>
      )}
    </div>
  )
}

export default CodeEditor

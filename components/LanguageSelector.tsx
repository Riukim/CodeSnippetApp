/* eslint-disable react/no-unescaped-entities */
import { useAppContext } from "@/ContextApi"
import { Keyboard } from "lucide-react"
import LanguageCombobox from "./LanguageCombobox"
import { Button } from "./ui/button"

interface LanguageSelectorProps {
  language: string
  setLanguage: (language: string) => void
  updateLanguage: () => void
}

const LanguageSelector = ({
  language,
  setLanguage,
  updateLanguage,
}: LanguageSelectorProps) => {
  const {
    snippetPanel: { isOpen },
  } = useAppContext()

  return (
    <div className="flex flex-col mt-4 gap-2">
      <div className="flex mt-4 gap-2 justify-between">
        <Keyboard
          size={24}
          className="text-input"
        />
        <div className="justify-self-end">
          <LanguageCombobox
            language={language}
            onChange={setLanguage}
          />
        </div>
      </div>
      {isOpen ? (
        <span className="text-input text-end text-xs">
          Select a new language for your snippet and click "Change Language" to
          save the changes.
        </span>
      ) : (
        <span className="text-input text-end text-xs">
          Select a new language for your snippet.
        </span>
      )}
      {isOpen && (
        <div className="flex justify-end mt-2">
          <Button
            size="sm"
            className="text-foreground"
            onClick={updateLanguage}
          >
            Change Language
          </Button>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector

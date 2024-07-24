import React, { useState } from 'react'
import { Check, ChevronsUpDown, Vault } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Lista dei linguaggi di programmazione supportati
const languages = [
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "CSS", label: "CSS" },
  { value: "Dart", label: "Dart" },
  { value: "Go", label: "Go" },
  { value: "HTML", label: "HTML" },
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "JSON", label: "JSON" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Lua", label: "Lua" },
  { value: "Markdown", label: "Markdown" },
  { value: "Matlab", label: "Matlab" },
  { value: "Objective-C", label: "Objective-C" },
  { value: "Perl", label: "Perl" },
  { value: "PHP", label: "PHP" },
  { value: "python", label: "Python" },
  { value: "R", label: "R" },
  { value: "Ruby", label: "Ruby" },
  { value: "Rust", label: "Rust" },
  { value: "Scala", label: "Scala" },
  { value: "Shell", label: "Shell" },
  { value: "SQL", label: "SQL" },
  { value: "Swift", label: "Swift" },
  { value: "Typescript", label: "TypeScript" },
  { value: "VBScript", label: "VBScript" },
  { value: "XML", label: "XML" },
  { value: "YAML", label: "YAML" },
]

interface LanguageComboboxProps {
  language: string
  onChange: (value: string) => void
}

const LanguageCombobox = ({ language, onChange }: LanguageComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(language)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    onChange(newValue)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-accent"
        >
          {value
            ? languages.find((lang) => lang.value === value)?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search language" />
            <CommandEmpty>Language not found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LanguageCombobox
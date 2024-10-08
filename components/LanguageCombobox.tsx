import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from 'react'

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
import { cn } from "@/lib/utils"

// Lista dei linguaggi di programmazione supportati
import { languages } from '@/constants/languages'

interface LanguageComboboxProps {
  language: string
  onChange: (value: string) => void
}

const LanguageCombobox = ({ language, onChange }: LanguageComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(language)

  useEffect(() => {
    setValue(language)
  }, [language])

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? value : currentValue
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
            : `${language}`}
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
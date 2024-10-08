import { useAppContext } from "@/ContextApi"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface TagsComboboxProps {
  onTagSelect: (tagName: string) => void
}

const TagsCombobox = ({ onTagSelect }: TagsComboboxProps) => {
  const {
    TagsState: { allTags },
  } = useAppContext()

  const [open, setOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")

  const handleSelect = (tagName: string) => {
    setSelectedTag(tagName)
    onTagSelect(tagName)
    setOpen(false)
  }

  useEffect(() => {
    setSelectedTag("")
  }, [selectedTag]);

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
          className="w-[50%] justify-end hover:bg-accent text-input"
        >
          {selectedTag || "Select a tag"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a tag" />
            <CommandEmpty>Tag not found</CommandEmpty>
            <CommandGroup>
              {allTags.map((tag) => (
                <CommandItem
                  key={tag._id}
                  value={tag.name}
                  onSelect={() => handleSelect(tag.name)}
                >
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TagsCombobox

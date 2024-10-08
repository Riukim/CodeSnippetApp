import { useAppContext } from '@/ContextApi'
import { SearchIcon } from 'lucide-react'
import { usePathname } from "next/navigation"
import { useState } from 'react'
import AddSnippetButton from './AddSnippetButton'

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const {
    snippetsState: { setSearchTerm: setGlobalSearchTerm },
  } = useAppContext()

  const pathname = usePathname()

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
    setGlobalSearchTerm(e.target.value)
  }

  return (
    <div className="relative pl-3 w-[60%] h-[38px] bg-secondary rounded-3xl flex items-center gap-2">
      <SearchIcon
        size={14}
        className="text-primary"
      />
      <input
        type="text"
        placeholder="Search a snippet..."
        className="w-[70%] outline-none text-sm bg-secondary ml-2"
        value={searchTerm}
        onChange={handleSearch}
      />
      {pathname !== "/public-snippets" && <AddSnippetButton />}
    </div>
  )
}

export default Searchbar
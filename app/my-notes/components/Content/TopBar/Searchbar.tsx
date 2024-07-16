import { SearchIcon } from 'lucide-react'
import React from 'react'
import AddSnippetButton from './AddSnippetButton'

const Searchbar = () => {
  return (
    <div className='relative pl-3 w-[60%] h-[38px] bg-accent rounded-3xl flex items-center gap-2'>
      <SearchIcon size={14} className='text-primary' />
      <input
        type="text"
        placeholder='Search a snippet...'
        className='w-[70%] outline-none text-sm bg-accent ml-2'
      />
      <AddSnippetButton />
    </div>
  )
}

export default Searchbar
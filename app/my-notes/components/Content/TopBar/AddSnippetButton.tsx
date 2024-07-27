import { useAppContext } from "@/ContextApi"
import React from "react"

const AddSnippetButton = () => {
  const {
    addSnippetState: { isAdding, setIsAdding },
    snippetPanel: { setIsOpen },
  } = useAppContext()

  const handleClick = () => {
    setIsAdding(true)
    setIsOpen(false)
  }

  console.log(isAdding);
  
  return (
    <div
      className="absolute flex gap-2 px-2 bg-primary rounded-full text-[14px] top-[5px] right-[5px] items-center cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="font-bold text-xl">+</div>
      <div className="max-md:hidden font-semibold">Snippet</div>
    </div>
  )
}

export default AddSnippetButton

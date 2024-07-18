import { Trash2 } from "lucide-react"
import Image from "next/image"
import React from "react"

const SnippetFooter = () => {
  return (
    <div className="flex justify-between text-[14px] mx-4 mt-4 border-t">
      <div className="flex gap-2 mt-4 items-center">
        <Image
          src="/icons/javascript.svg"
          alt="js"
          width={18}
          height={18}
        />
        <span className="dark:text-zinc-400 text-zinc-600">Javascript</span>
      </div>
      <div className="mt-4">
        <Trash2
          size={18}
          className="dark:text-zinc-400 text-zinc-600 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default SnippetFooter

import { Trash2 } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

interface SnippetFooterProps {
  language: string
}

const SnippetFooter = ({ language = "" }: SnippetFooterProps) => {
  const [imageExists, setImageExists] = useState(false)
  const imagePath = `/icons/${language.toLowerCase()}.svg`

  useEffect(() => {
    const checkImage = async () => {
      try {
        const res = await fetch(imagePath)
        if (res.ok) {
          setImageExists(true)
        } else {
          setImageExists(false)
        }
      } catch (error) {
        setImageExists(false)
      }
    }

    checkImage()
  }, [imagePath])

  return (
    <div className="flex justify-between text-[14px] mx-4 mt-4 border-t">
      <div className="flex gap-2 mt-4 items-center">
        {imageExists && (
          <Image
            src={imagePath}
            alt={`${language} icon`}
            width={18}
            height={18}
          />
        )}
        <span className="dark:text-zinc-400 text-zinc-600">{language}</span>
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

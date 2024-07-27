import { useAppContext } from "@/ContextApi"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

interface SnippetFooterProps {
  language: string,
  snippetId: string | number
}

const SnippetFooter = ({ language = "", snippetId }: SnippetFooterProps) => {
  const {
    snippetsState: { deleteSnippet },
  } = useAppContext()

  const [imageExists, setImageExists] = useState(false)
  const imagePath = `/icons/${language.toLowerCase()}.svg`

  // Effect per verificare se icona immagine è presente
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

  // Funzione per eliminare snippet
  const handleDelete = async () => {
    try {
      await deleteSnippet(snippetId)
      console.log("Snippet deleted successfully");
      
    } catch (error) {
      console.error("Error deleting snippet: ", error)
    }
  }

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
        <span className="text-muted-foreground">{language}</span>
      </div>
      <div className="mt-4">
        <Trash2
          size={18}
          className="text-muted-foreground hover:text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default SnippetFooter

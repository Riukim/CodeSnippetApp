import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes } from "@/types/context"
import { Trash2, Undo } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

interface SnippetFooterProps {
  snippet: SingleSnippetTypes
}

const SnippetFooter = ({ snippet }: SnippetFooterProps) => {
  const {
    snippetsState: { allSnippets ,deleteSnippet, updateSnippet, setAllSnippets },
  } = useAppContext()

  const [isTrash, setIsTrash] = useState(snippet.isTrash)

  const [imageExists, setImageExists] = useState(false)
  const imagePath = `/icons/${snippet.language.toLowerCase()}.svg`

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

  const toggleIsTrash = async () => {
    const newIsTrashStatus = !isTrash
    setIsTrash(newIsTrashStatus)

    try {
      await updateSnippet(snippet._id, { isTrash: newIsTrashStatus })
      
    } catch (error) {
      console.log("Failed to update trash status",error);
      setIsTrash(isTrash)
    }
  }

  // Funzione per eliminare snippet
  const handleDelete = async () => {
    try {
      await deleteSnippet(snippet._id)
      console.log("Snippet deleted successfully");
      
    } catch (error) {
      console.error("Error deleting snippet: ", error)
    }
  }

  const handleUndo = async () => {
    const trashedSnippetId = allSnippets.findIndex((s) => s._id === snippet._id)

    if (trashedSnippetId !== -1) {
      const updatedSnippets = [...allSnippets]
      const trashedSnippet = allSnippets[trashedSnippetId]
      trashedSnippet.isTrash = false

      try {
        await updateSnippet(snippet._id, { isTrash: false })
        setAllSnippets(updatedSnippets)
      } catch (error) {
        console.log("Failed to update the snippet", error)
      }
    }
  }

  const handleTrashClick = async () => {
    if (isTrash) {
      handleDelete()
    } else {
      await toggleIsTrash()
      toast("Snippet has been moved to trash.", {
        position: "top-center",
        action: {
          label: "Undo",
          onClick: handleUndo,
        },
      })
    }
  }

  return (
    <div className="flex justify-between text-[14px] mx-4 mt-4 border-t">
      <div className="flex gap-2 mt-4 items-center">
        {imageExists && (
          <Image
            src={imagePath}
            alt={`${snippet.language} icon`}
            width={18}
            height={18}
          />
        )}
        <span className="text-muted-foreground">{snippet.language}</span>
      </div>
      <div className="mt-4 flex gap-5">
        {isTrash && (
          <Undo
            size={18}
            className="text-muted-foreground hover:text-green-600 cursor-pointer"
            onClick={toggleIsTrash}
          />
        )}
        <Trash2
          size={18}
          className="text-muted-foreground hover:text-red-500 cursor-pointer"
          onClick={handleTrashClick}
        />
      </div>
    </div>
  )
}

export default SnippetFooter

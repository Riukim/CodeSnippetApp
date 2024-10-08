import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppContext } from "@/ContextApi"
import { SingleSnippetTypes } from "@/types/context"
import { Trash2, Undo } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface SnippetFooterProps {
  snippet: SingleSnippetTypes
}

const SnippetFooter = ({ snippet }: SnippetFooterProps) => {
  const {
    snippetsState: {
      allSnippets,
      deleteSnippet,
      updateSnippet,
      setAllSnippets,
    },
    isMobileState: {isMobile}
  } = useAppContext()

  const pathname = usePathname()

  const [isTrash, setIsTrash] = useState(snippet.isTrash)
  const [isFavorite, setIsFavorite] = useState(snippet.isFavorite)
  const [showDialog, setShowDialog] = useState(false)
  const [imageExists, setImageExists] = useState(false)

  const getImagePath = (language: string) => {
    const lowerCaseLanguage = language.toLowerCase()

    if (lowerCaseLanguage === "c#") {
      return "/icons/csharp.png"
    }

    return `/icons/${lowerCaseLanguage}.svg`
  }

  const imagePath = getImagePath(snippet.language)

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
    
    // Settiamo isFavorite to false se lo snippet viene cestinato
    let updatedFields = { isTrash: newIsTrashStatus, isFavorite }
    
    if (newIsTrashStatus) {
      updatedFields.isFavorite = false
      setIsFavorite(false)
    }

    try {
      await updateSnippet(snippet._id, updatedFields)
    } catch (error) {
      console.log("Failed to update trash status", error)
      setIsTrash(isTrash)

      if (newIsTrashStatus) {
        setIsFavorite(true)
      }
    }
  }

  // Funzione per eliminare snippet
  const handleDelete = async () => {
    try {
      await deleteSnippet(snippet._id)
      console.log("Snippet deleted successfully")
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
      setShowDialog(true)
      console.log(showDialog)
    } else {
      await toggleIsTrash()
      toast("Snippet has been moved to trash.", {
        position: isMobile ? "bottom-center" : "top-center",
        action: {
          label: "Undo",
          onClick: handleUndo,
        },
        closeButton: true,
        className: "border-none"
      })
    }
  }

  const confirmDelete = async () => {
    await handleDelete()
    setShowDialog(false)
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
        {isTrash ? (
          <>
            <Undo
              size={18}
              className="text-muted-foreground hover:text-green-600 cursor-pointer"
              onClick={toggleIsTrash}
            />
            <Dialog
              open={showDialog}
              onOpenChange={setShowDialog}
            >
              <DialogTrigger asChild>
                <Trash2
                  size={18}
                  className="text-muted-foreground hover:text-red-500 cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to permanently delete this snippet?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-between">
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                  >
                    Delete
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          pathname !== "/public-snippets" && (
            <Trash2
              size={18}
              className="text-muted-foreground hover:text-red-500 cursor-pointer"
              onClick={handleTrashClick}
            />
          )
        )}
      </div>
    </div>
  )
}

export default SnippetFooter

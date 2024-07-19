"use client"

import { useAppContext } from "@/ContextApi"
import { useEffect, useState } from "react"
import { snippetSchema } from "@/schema/snippetSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SingleSnippetTypes } from "@/types/context"

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: { isMobile },
    SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
  } = useAppContext()

  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: zodResolver(snippetSchema)
  })

  const [singleSnippet, setSingleSnippet] = useState<SingleSnippetTypes | undefined>(undefined)
  
  useEffect(() => {
    if (isOpen) {
      if (selectedSnippet) {
        console.log(selectedSnippet);
        
        setSingleSnippet(selectedSnippet)
      }
    }
  }, [isOpen, selectedSnippet]);

  console.log(singleSnippet)

  return (
    <div
      className={`bg-card shadow-md p-3 h-[700px] rounded-lg ${
        isOpen ? "block" : "hidden"
      }  
        ${
          isMobile
            ? "absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : ""
        }
        ${isMobile ? "w-4/5" : "w-1/2"}
      `}
    >
      {singleSnippet?.title}
      <div
        onClick={() => setIsOpen(false)}
        className="cursor-pointer mt-2"
      >
        close
      </div>
    </div>
  )
}

export default ModifySnippet

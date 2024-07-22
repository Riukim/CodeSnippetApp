"use client"

import { useAppContext } from "@/ContextApi"
import React, { useEffect, useState } from "react"
import { SingleSnippetTypes } from "@/types/context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { snippetFormSchema } from "@/schema/snippetFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets, updateSnippet },
    SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
  } = useAppContext()

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetTypes | undefined
  >(undefined)
  const [title, setTitle] = useState<string>("")
  const [description, setDescritpion] = useState<string>("")

  useEffect(() => {
    if (isOpen && selectedSnippet) {
      setSingleSnippet(selectedSnippet)
      setTitle(selectedSnippet.title)
      setDescritpion(selectedSnippet.description)
    }
  }, [isOpen, selectedSnippet])

  const onUpdate = async () => {
    if (!singleSnippet) return

    const updatedData = { title, description }

    try {
      await updateSnippet(singleSnippet._id, updatedData)

      const newAllSnippets = allSnippets.map((snippet) => {
        if (snippet._id === singleSnippet._id) {
          return { ...snippet, ...updatedData }
        }
        return snippet
      })

      setSingleSnippet({ ...singleSnippet, ...updatedData })
      setAllSnippets(newAllSnippets)
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update the snippet in the database:", error)
    }
  }

  const form = useForm({
    resolver: zodResolver(snippetFormSchema),
  })

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
      <div>
        <h2 className="font-semibold text-lg mb-2">Modify your Snippet</h2>
        <Input
          placeholder="New Title..."
          value={title}
          className="bg-accent"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={onUpdate}
            className="mt-4"
            size="sm"
          >
            Update Title
          </Button>
        </div>

        <Textarea
          placeholder="New Description..."
          value={description}
          className="mt-4 bg-accent"
          onChange={(e) => setDescritpion(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end">
          <Button
            onClick={onUpdate}
            className="mt-4"
            size="sm"
          >
            Update Description
          </Button>
        </div>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className="cursor-pointer mt-2"
      >
        Close
      </div>
    </div>
  )
}

export default ModifySnippet
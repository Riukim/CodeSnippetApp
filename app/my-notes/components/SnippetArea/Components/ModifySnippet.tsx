"use client"

import { useAppContext } from "@/ContextApi"
import React, { useEffect, useState } from "react"
import { SingleSnippetTypes } from "@/types/context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { snippetFormSchema } from "@/schema/snippetSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const ModifySnippet = () => {
  const {
    snippetPanel: { isOpen, setIsOpen },
    isMobileState: { isMobile },
    snippetsState: { allSnippets, setAllSnippets },
    SelectedSnippetState: { selectedSnippet, setSelectedSnippet },
  } = useAppContext()

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetTypes | undefined
  >(undefined)
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    if (isOpen && selectedSnippet) {
      setSingleSnippet(selectedSnippet)
      setTitle(selectedSnippet.title)
    }
  }, [isOpen, selectedSnippet])

  const onUpdateTitle = () => {
    if (!singleSnippet) return

    const newSingleSnippet = { ...singleSnippet, title }
    setSingleSnippet(newSingleSnippet)

    const newAllSnippets = allSnippets.map((snippet) => {
      if (snippet.id === singleSnippet.id) {
        return newSingleSnippet
      }
      return snippet
    })
    setAllSnippets(newAllSnippets)
    setIsOpen(false)
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
      <h2>Modify your Snippet</h2>
      <Form {...form}>
        <form onSubmit={onUpdateTitle}>
          <FormItem>
            <FormLabel>New Title</FormLabel>
            <FormControl>
              <Input
                placeholder="New Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
          </FormItem>
          <Button
            type="submit"
            className="mt-4"
          >
            Update Title
          </Button>
        </form>
      </Form>

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

{
  /*       <span>
        <Input
          placeholder="New Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </span>
      <Button
        onClick={onUpdateTitle}
        className="mt-4"
      >
        Update Title
      </Button> */
}

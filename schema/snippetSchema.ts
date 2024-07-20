import { z } from "zod"

export const snippetFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.string().min(1, "At least one tag is required"),
  description: z.string().min(1, "Description is required"),
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required")
})
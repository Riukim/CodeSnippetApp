import { z } from "zod"

export const snippetFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required.",
  }),
  tags: z.string().min(2, {
    message: "At least one tag is required."
  }),
  description: z.string().min(5, {
    message: "Description is required."
  }),
  code: z.string().min(1, {
    message: "Code is required."
  }),
  language: z.string({
    required_error: "Please select a language."
  }),
})

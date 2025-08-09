import { z } from "zod";



export const notesFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  content: z.string().min(1, {
    message: "Content cannot be empty.",
  }),
});

import { z } from "zod"

export const CreateUserSchema = z
  .object({
    name: z.string(),
    age: z.coerce.number({ invalid_type_error: "Age required" }).min(12),
    email: z.string().email(),
    notes: z.string().optional(),
    countryCode: z.string(),
  })
  .strict()

export type CreateUser = z.infer<typeof CreateUserSchema>

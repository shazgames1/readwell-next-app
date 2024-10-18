"use server"
import { revalidatePath } from "next/cache"
import { db } from "./drizzle"
import { usersTable } from "./schema"
import {
  randCountryCode,
  randEmail,
  randNumber,
  randUserName,
} from "@ngneat/falso"
import { CreateUser, CreateUserSchema } from "@/lib/validators"

export async function generateUser() {
  "use server"

  await db.insert(usersTable).values({
    age: randNumber({ min: 16, max: 40 }),
    email: randEmail(),
    name: randUserName(),
    countryCode: randCountryCode(),
  } as typeof usersTable.$inferInsert)

  revalidatePath("/")
}

export async function createUser(formData: CreateUser) {
  "use server"

  const { age, name, email, countryCode, notes } =
    await CreateUserSchema.parseAsync(formData)

  await db.insert(usersTable).values({
    age: age,
    email: email,
    name: name,
    countryCode: countryCode,
    notes: notes,
  } as typeof usersTable.$inferInsert)

  revalidatePath("/")
}

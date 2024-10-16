import { db } from "@/db/drizzle"
import { usersTable } from "@/db/schema"
import { revalidatePath } from "next/cache"
import {
  randEmail,
  randUserName,
  randNumber,
  randCountryCode,
} from "@ngneat/falso"
import { ConfettiButton } from "@/components/ui/confetti"

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export default async function Home() {
  const users = await db.select().from(usersTable)

  async function generateUser() {
    "use server"

    await db.insert(usersTable).values({
      age: randNumber({ min: 16, max: 40 }),
      email: randEmail(),
      name: randUserName(),
      countryCode: randCountryCode(),
    } as typeof usersTable.$inferInsert)

    revalidatePath("/")
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          All users:
        </h1>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} from {getFlagEmoji(u.countryCode)}
            </li>
          ))}
        </ul>
        <form action={generateUser}>
          <ConfettiButton className="outline outline-1 p-3 rounded-lg">
            Add new random user
          </ConfettiButton>
        </form>
      </main>
    </div>
  )
}

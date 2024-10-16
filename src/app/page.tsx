import { db } from "@/db/drizzle"
import { usersTable } from "@/db/schema"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import { randEmail, randUserName, randNumber, randCountry } from "@ngneat/falso"

export default async function Home() {
  const users = await db.select().from(usersTable)

  async function generateUser() {
    "use server"

    await db.insert(usersTable).values({
      age: randNumber({ min: 16, max: 40 }),
      email: randEmail(),
      name: randUserName(),
      country: randCountry()
    } as typeof usersTable.$inferInsert)

    revalidatePath("/")
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Users:</h1>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} ({u.id}) {u.email} from {u.country}
            </li>
          ))}
        </ul>
        <form action={generateUser}>
          <button>Add new random user</button>
        </form>
      </main>
    </div>
  )
}

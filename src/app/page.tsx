import { db } from "@/db/drizzle"
import { usersTable } from "@/db/schema"
import { FC, PropsWithChildren } from "react"
import { CreateUserDrawer } from "@/components/ui/create-user-drawer"
import { Button } from "@/components/ui/button"

interface Props extends PropsWithChildren {}

const Index: FC<Props> = async ({}) => {
  const users = await db.select().from(usersTable)

  return (
    <div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
      <CreateUserDrawer />
    </div>
  )
}

export default Index

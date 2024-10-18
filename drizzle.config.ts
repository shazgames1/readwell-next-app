import dotenv from "dotenv"
// dotenv doesn't support string interpolation in .env, so use additional lib for it
import dotenvExpand from "dotenv-expand"
import { defineConfig } from "drizzle-kit"

dotenvExpand.expand(dotenv.config())

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

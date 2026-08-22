import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/lib/db/auth-schema.ts", "./src/lib/db/app-schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});

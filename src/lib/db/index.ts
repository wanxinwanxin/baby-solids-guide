import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as appSchema from "./app-schema";
import * as authSchema from "./auth-schema";

export const schema = { ...authSchema, ...appSchema };
export type Db = NodePgDatabase<typeof schema>;

let _db: Db | null = null;

/** Lazy client — only touches DATABASE_URL when a request actually needs it. */
export function getDb(): Db {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set — sync/auth are disabled in this environment.");
    _db = drizzle(new Pool({ connectionString: url, max: 5 }), { schema });
  }
  return _db;
}

/** For tests: swap in a pglite-backed instance. */
export function setDbForTesting(db: Db) {
  _db = db;
}

export const dbConfigured = () => !!process.env.DATABASE_URL;

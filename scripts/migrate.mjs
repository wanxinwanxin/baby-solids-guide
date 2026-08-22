/**
 * Runtime migration runner — used in the Railway start command so migrations
 * apply over the private network (unavailable at build time). Uses only
 * production dependencies (drizzle-orm + pg), never drizzle-kit.
 */
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.log("migrate: DATABASE_URL not set — skipping (auth/sync disabled).");
  process.exit(0);
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const db = drizzle(pool);
await migrate(db, { migrationsFolder: "./drizzle" });
await pool.end();
console.log("migrate: schema is up to date.");

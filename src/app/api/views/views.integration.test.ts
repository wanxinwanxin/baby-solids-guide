import { beforeAll, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { and, eq } from "drizzle-orm";
import { schema, setDbForTesting, type Db } from "@/lib/db";
import { POST } from "./route";

/** D5 option 2 — aggregate page counting on pglite. */

let db: Db;

const today = () => new Date().toISOString().slice(0, 10);

function post(body: unknown) {
  return POST(
    new Request("http://test/api/views", {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

beforeAll(async () => {
  process.env.DATABASE_URL = "pglite://views-test";
  const client = new PGlite();
  db = drizzle(client, { schema }) as unknown as Db;
  await migrate(db as never, { migrationsFolder: "./drizzle" });
  setDbForTesting(db);
});

describe("POST /api/views (pglite)", () => {
  it("creates a (day, path) row and increments it on repeat views", async () => {
    expect((await post({ path: "/foods/banana" })).status).toBe(204);
    expect((await post({ path: "/foods/banana" })).status).toBe(204);
    const [row] = await db
      .select()
      .from(schema.pageViews)
      .where(and(eq(schema.pageViews.path, "/foods/banana"), eq(schema.pageViews.day, today())));
    expect(row.n).toBe(2);
  });

  it("collapses invite links so tokens never reach the table", async () => {
    expect((await post({ path: "/join/super-secret-token" })).status).toBe(204);
    const rows = await db
      .select()
      .from(schema.pageViews)
      .where(eq(schema.pageViews.path, "/join"));
    expect(rows).toHaveLength(1);
    const leaked = await db
      .select()
      .from(schema.pageViews)
      .where(eq(schema.pageViews.path, "/join/super-secret-token"));
    expect(leaked).toHaveLength(0);
  });

  it("rejects query strings, schemes, and junk bodies", async () => {
    expect((await post({ path: "/foods?x=1" })).status).toBe(400);
    expect((await post({ path: "https://evil.example/" })).status).toBe(400);
    expect((await post({ path: "/a%2e%2e" })).status).toBe(400);
    expect((await post({})).status).toBe(400);
    expect((await post("not json")).status).toBe(400);
  });

  it("stores nothing but day, path, and count", async () => {
    const rows = await db.select().from(schema.pageViews);
    for (const row of rows) {
      expect(Object.keys(row).sort()).toEqual(["day", "n", "path"]);
    }
  });
});

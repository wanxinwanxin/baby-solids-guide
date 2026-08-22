import { jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

/**
 * Phase 6 sync tables (ROADMAP Part II). `payload` is the exact client shape,
 * validated server-side with the same Zod schemas the client uses.
 */

export const babies = pgTable("babies", {
  id: uuid("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  payload: jsonb("payload").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const exposureLogs = pgTable("exposure_logs", {
  id: uuid("id").primaryKey(),
  babyId: uuid("baby_id")
    .notNull()
    .references(() => babies.id, { onDelete: "cascade" }),
  payload: jsonb("payload").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const allergenOverrides = pgTable(
  "allergen_overrides",
  {
    babyId: uuid("baby_id")
      .notNull()
      .references(() => babies.id, { onDelete: "cascade" }),
    allergenId: text("allergen_id").notNull(),
    payload: jsonb("payload").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.babyId, t.allergenId] })],
);

export const checkIns = pgTable("check_ins", {
  id: uuid("id").primaryKey(),
  babyId: uuid("baby_id")
    .notNull()
    .references(() => babies.id, { onDelete: "cascade" }),
  payload: jsonb("payload").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const plans = pgTable("plans", {
  babyId: uuid("baby_id")
    .primaryKey()
    .references(() => babies.id, { onDelete: "cascade" }),
  payload: jsonb("payload").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const pushSubscriptions = pgTable("push_subscriptions", {
  endpoint: text("endpoint").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  keys: jsonb("keys").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reminders = pgTable("reminders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(), // "check-in" | "maintenance"
  payload: jsonb("payload").notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
});

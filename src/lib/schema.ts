import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = sqliteTable("user", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  first_name: text("first_name"),
  last_name: text("last_name"),
  uid: text("uid"),
  verification_token: text("verification_token"),
  email: text("email"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  hash: text("password"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    user_id: integer("user_id").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.user_id, vt.token] })]
);

export const bookmarks = sqliteTable(
  "bookmarks",
  {
    id: integer().notNull().primaryKey({ autoIncrement: true }),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    link: text().notNull(),
    data: text({ mode: "json" }).notNull(),
  },
  (bookmarks) => [
    primaryKey({
      columns: [bookmarks.id],
    }),
  ]
);

import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { articleTable } from "../articles/schema";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rolesTable = pgTable("roles", {
  id: text("id").primaryKey(),
  description: text("description").notNull(),
});

export const userRolesTable = pgTable("user_roles", {
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  roleId: text("role_id")
    .notNull()
    .references(() => rolesTable.id, { onDelete: "cascade" }),
});

export const authorProfilesTable = pgTable("author_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .unique(),
  bio: text("bio"),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  authorProfile: one(authorProfilesTable, {
    fields: [usersTable.id],
    references: [authorProfilesTable.userId],
  }),
}));

export const authorProfilesRelations = relations(
  authorProfilesTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [authorProfilesTable.userId],
      references: [usersTable.id],
    }),
    articles: many(articleTable),
  })
);

export const articlesRelations = relations(articleTable, ({ one }) => ({
  author: one(authorProfilesTable, {
    fields: [articleTable.author_id],
    references: [authorProfilesTable.id],
  }),
}));

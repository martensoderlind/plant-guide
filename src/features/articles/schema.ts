import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const articleCategoryEnum = pgEnum("article_category", [
  "basics",
  "watering",
  "lighting",
  "diseases",
  "propagation",
  "seasonal",
  "air-purifying",
  "troubleshooting",
  "advanced-techniques",
]);

export const difficultyLevelEnum = pgEnum("difficulty_level", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const articleTable = pgTable("articles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  excerpt: text(),
  content: text().notNull(),
  featured_image_url: varchar({ length: 500 }),
  category: articleCategoryEnum().notNull(),
  difficulty_level: difficultyLevelEnum().notNull(),
  status: articleStatusEnum().default("draft").notNull(),
  is_featured: boolean().default(false).notNull(),
  reading_time_minutes: integer(),
  views: integer().default(0),
  likes: integer().default(0),
  meta_title: varchar({ length: 255 }),
  meta_description: varchar({ length: 500 }),
  author_id: text("author_id"),
  published_at: timestamp("published_at"),
  updated_at: timestamp("updated_at").defaultNow(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type Article = typeof articleTable.$inferSelect;

export const tagTable = pgTable("tags", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull().unique(),
  slug: varchar({ length: 100 }).notNull().unique(),
  color: varchar({ length: 7 }).default("#10b981"), // Hex color
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const articleTagTable = pgTable("article_tags", {
  id: uuid().primaryKey().defaultRandom(),
  article_id: integer()
    .notNull()
    .references(() => articleTable.id, { onDelete: "cascade" }),
  tag_id: uuid()
    .notNull()
    .references(() => tagTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const articleRelations = relations(articleTable, ({ many }) => ({
  articleTags: many(articleTagTable),
}));

export const tagRelations = relations(tagTable, ({ many }) => ({
  articleTags: many(articleTagTable),
}));

export const articleTagRelations = relations(articleTagTable, ({ one }) => ({
  article: one(articleTable, {
    fields: [articleTagTable.article_id],
    references: [articleTable.id],
  }),
  tag: one(tagTable, {
    fields: [articleTagTable.tag_id],
    references: [tagTable.id],
  }),
}));

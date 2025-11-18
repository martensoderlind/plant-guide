import {
  pgTable,
  unique,
  integer,
  varchar,
  timestamp,
  boolean,
  jsonb,
  text,
  foreignKey,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const articleCategory = pgEnum("article_category", [
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
export const articleStatus = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);
export const careLevel = pgEnum("care_level", ["easy", "medium", "hard"]);
export const difficultyLevel = pgEnum("difficulty_level", [
  "beginner",
  "intermediate",
  "advanced",
]);
export const humidityPreference = pgEnum("humidity_preference", [
  "easy",
  "medium",
  "hard",
]);
export const lightRequirement = pgEnum("light_requirement", [
  "low",
  "medium",
  "bright",
  "direct",
]);
export const plantCategory = pgEnum("plant_category", [
  "indoor plant",
  "outdoor plant",
  "succulents",
  "flowering plants",
]);

export const plants = pgTable(
  "plants",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "plants_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    name: varchar({ length: 255 }).notNull(),
    scientificName: varchar("scientific_name", { length: 255 }).notNull(),
    waterFrequencyDays: integer("water_frequency_days").notNull(),
    temperatureMin: integer("temperature_min").notNull(),
    temperatureMax: integer("temperature_max").notNull(),
    imageUrl: varchar("image_url", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    careLevel: careLevel("care_level").notNull(),
    lightRequirement: lightRequirement("light_requirement").notNull(),
    humidityPreference: humidityPreference("humidity_preference").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    plantCategory: plantCategory("plant_category")
      .default("indoor plant")
      .notNull(),
    slug: varchar({ length: 255 }).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    content: jsonb().notNull(),
  },
  (table) => [unique("plants_slug_unique").on(table.slug)]
);

export const articles = pgTable(
  "articles",
  {
    id: integer()
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "articles_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    title: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull(),
    excerpt: text(),
    featuredImageUrl: varchar("featured_image_url", { length: 500 }),
    category: articleCategory().notNull(),
    difficultyLevel: difficultyLevel("difficulty_level").notNull(),
    status: articleStatus().default("draft").notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    readingTimeMinutes: integer("reading_time_minutes"),
    views: integer().default(0),
    likes: integer().default(0),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    authorId: text("author_id"),
    publishedAt: timestamp("published_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    content: jsonb().notNull(),
  },
  (table) => [unique("articles_slug_unique").on(table.slug)]
);

export const users = pgTable("users", {
  id: text().primaryKey().notNull(),
  email: text().notNull(),
  username: text().notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const userRoles = pgTable(
  "user_roles",
  {
    userId: text("user_id").notNull(),
    roleId: text("role_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "user_roles_user_id_users_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: "user_roles_role_id_roles_id_fk",
    }).onDelete("cascade"),
  ]
);

export const roles = pgTable("roles", {
  id: text().primaryKey().notNull(),
  description: text().notNull(),
});

export const tags = pgTable(
  "tags",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    slug: varchar({ length: 100 }).notNull(),
    color: varchar({ length: 7 }).default("#10b981"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("tags_name_unique").on(table.name),
    unique("tags_slug_unique").on(table.slug),
  ]
);

export const articleTags = pgTable(
  "article_tags",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    articleId: integer("article_id").notNull(),
    tagId: uuid("tag_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.articleId],
      foreignColumns: [articles.id],
      name: "article_tags_article_id_articles_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.tagId],
      foreignColumns: [tags.id],
      name: "article_tags_tag_id_tags_id_fk",
    }).onDelete("cascade"),
  ]
);

export const authorProfiles = pgTable(
  "author_profiles",
  {
    id: text().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    bio: text(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique("author_profiles_user_id_unique").on(table.userId)]
);

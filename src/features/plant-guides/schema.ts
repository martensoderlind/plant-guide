import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const careLevelEnum = pgEnum("care_level", ["easy", "medium", "hard"]);
export const lightRequirementEnum = pgEnum("light_requirement", [
  "low",
  "medium",
  "bright",
  "direct",
]);
export const humidityPreferenceEnum = pgEnum("humidity_preference", [
  "easy",
  "medium",
  "hard",
]);
export const plantCategory = pgEnum("plant_category", [
  "indoor plant",
  "outdoor plant",
  "succulents",
  "flowering plants",
]);

export const plantTable = pgTable("plants", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  scientific_name: varchar({ length: 255 }).notNull(),
  description: varchar(),
  water_frequency_days: integer().notNull(),
  temperature_min: integer().notNull(),
  temperature_max: integer().notNull(),
  image_url: varchar({ length: 255 }),
  care_level: careLevelEnum().notNull(),
  light_requirement: lightRequirementEnum().notNull(),
  humidity_preference: humidityPreferenceEnum().notNull(),
  plant_category: plantCategory().default("indoor plant").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type Plant = typeof plantTable.$inferSelect;

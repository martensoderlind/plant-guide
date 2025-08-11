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

export const plantTable = pgTable("plants", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  scientific_name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  water_frequency_days: integer().notNull(),
  temperature_min: integer().notNull(),
  temperature_max: integer().notNull(),
  image_url: varchar({ length: 255 }),
  care_level: careLevelEnum().notNull(),
  light_requirement: lightRequirementEnum().notNull(),
  humidity_preference: humidityPreferenceEnum().notNull(),
  created_at: timestamp("timestamp1").notNull().defaultNow(),
});

export type Plant = typeof plantTable.$inferSelect;

import { z } from "zod";
import {
  articleCategoryEnum,
  difficultyLevelEnum,
  articleStatusEnum,
} from "../articles/schema";

export const plantSchema = z
  .object({
    name: z.string().min(1, "Name cannot be empty").max(100, "Name too long"),
    scientific_name: z
      .string()
      .min(1, "Scientific name cannot be empty")
      .max(150, "Scientific name too long"),
    description: z.string().max(1000, "Description too long").nullable(),
    water_frequency_days: z
      .number()
      .int()
      .min(1, "Water frequency must be at least 1 day")
      .max(365, "Water frequency cannot exceed 365 days"),
    temperature_min: z
      .number()
      .min(-50, "Temperature too low")
      .max(50, "Temperature too high"),
    temperature_max: z
      .number()
      .min(-50, "Temperature too low")
      .max(50, "Temperature too high"),
    image_url: z.string().url("Invalid URL format").optional().nullable(),
    care_level: z.enum(["easy", "medium", "hard"]),
    light_requirement: z.enum(["medium", "low", "bright", "direct"]),
    humidity_preference: z.enum(["easy", "medium", "hard"]),
    plant_category: z.enum([
      "indoor plant",
      "outdoor plant",
      "succulents",
      "flowering plants",
    ]),
  })
  .refine((data) => data.temperature_min <= data.temperature_max, {
    message: "Minimum temperature cannot be higher than maximum temperature",
    path: ["temperature_min"],
  });

export const articleSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(255, "Title too long"),
  slug: z.string().min(1, "Slug cannot be empty").max(255, "Slug too long"),
  excerpt: z.string().max(1000, "Excerpt too long").nullable(),
  content: z.string().min(1, "Content cannot be empty"),
  featured_image_url: z
    .string()
    .url("Invalid URL format")
    .optional()
    .nullable(),
  category: z.enum(articleCategoryEnum.enumValues),
  difficulty_level: z.enum(difficultyLevelEnum.enumValues),
  status: z.enum(articleStatusEnum.enumValues),
  is_featured: z.boolean().optional(),
  meta_title: z.string().max(255, "Meta title too long").nullable(),
  meta_description: z.string().max(500, "Meta description too long").nullable(),
});
export const newUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      "Full name can only contain letters, spaces, apostrophes, and hyphens"
    ),
  avatarUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.null())
    .transform((val) => (val === "" ? null : val)),
});

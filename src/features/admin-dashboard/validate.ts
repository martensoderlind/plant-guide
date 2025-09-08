import { z } from "zod";

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

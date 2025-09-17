import { Article } from "../articles/schema";
import { Plant } from "../plant-guides/schema";

export type Plants = Plant;

export type NewPlant = Omit<Plant, "id" | "created_at" | "updated_at">;
export type NewArticle = Omit<
  Article,
  | "id"
  | "created_at"
  | "published_at"
  | "updated_at"
  | "reading_time_minutes"
  | "views"
  | "likes"
  | "author_id"
>;

export type Result =
  | {
      success: boolean;
      message: string;
      error?: undefined;
    }
  | {
      success: boolean;
      message: string;
      error: unknown;
    };

export type FormError = {
  path: string;
  message: string;
};
export type validationErrors = {
  origin: string;
  code: string;
  format?: string;
  pattern?: string[];
  path: string[];
  message: string;
};

import { Article } from "../articles/schema";
import {
  ArticleCategoryEnums,
  ArticleStatusEnums,
  DifficultyLevelEnums,
} from "../articles/types";
import { Plant } from "../plant-guides/schema";

export type Plants = Plant;

export type NewPlant = Omit<
  Plant,
  "id" | "created_at" | "updated_at" | "description"
>;
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
> & {
  tag: string[];
};

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

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  reading_time_minutes: number;
  category: ArticleCategoryEnums;
  difficulty_level: DifficultyLevelEnums;
  status: ArticleStatusEnums;
  is_featured: boolean;
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
  currentTag: string;
}

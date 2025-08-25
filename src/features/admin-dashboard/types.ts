import { Plant } from "../plant-guides/schema";

export type Plants = Plant;

export type NewPlant = Omit<Plant, "id" | "created_at" | "updated_at">;

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  difficulty_level: string;
  status: string;
  is_featured: boolean;
  reading_time_minutes: number;
  views: number;
  likes: number;
  published_at: Date | null;
  created_at: Date;
};

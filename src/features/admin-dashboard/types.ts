export type Plants = {
  id: number;
  name: string;
  scientific_name: string;
  description: string | null;
  water_frequency_days: number;
  temperature_min: number;
  temperature_max: number;
  image_url: string | null;
  care_level: string;
  light_requirement: string;
  humidity_preference: string;
  plant_category: string;
  updated_at: Date | null;
  created_at: Date;
};

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

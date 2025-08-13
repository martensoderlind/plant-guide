export type Plants = {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  water_frequency_days: number;
  temperature_min: number;
  temperature_max: number;
  image_url: string;
  care_level: string;
  light_requirement: string;
  humidity_preference: string;
  plant_category: string;
  created_at: string;
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
  published_at: string | null;
  created_at: string;
};

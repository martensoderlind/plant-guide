-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."article_category" AS ENUM('basics', 'watering', 'lighting', 'diseases', 'propagation', 'seasonal', 'air-purifying', 'troubleshooting', 'advanced-techniques');--> statement-breakpoint
CREATE TYPE "public"."article_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."care_level" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TYPE "public"."difficulty_level" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."humidity_preference" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TYPE "public"."light_requirement" AS ENUM('low', 'medium', 'bright', 'direct');--> statement-breakpoint
CREATE TYPE "public"."plant_category" AS ENUM('indoor plant', 'outdoor plant', 'succulents', 'flowering plants');--> statement-breakpoint
CREATE TABLE "plants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "plants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"scientific_name" varchar(255) NOT NULL,
	"water_frequency_days" integer NOT NULL,
	"temperature_min" integer NOT NULL,
	"temperature_max" integer NOT NULL,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"care_level" "care_level" NOT NULL,
	"light_requirement" "light_requirement" NOT NULL,
	"humidity_preference" "humidity_preference" NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"plant_category" "plant_category" DEFAULT 'indoor plant' NOT NULL,
	"slug" varchar(255) NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"content" jsonb NOT NULL,
	CONSTRAINT "plants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"featured_image_url" varchar(500),
	"category" "article_category" NOT NULL,
	"difficulty_level" "difficulty_level" NOT NULL,
	"status" "article_status" DEFAULT 'draft' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"reading_time_minutes" integer,
	"views" integer DEFAULT 0,
	"likes" integer DEFAULT 0,
	"meta_title" varchar(255),
	"meta_description" varchar(500),
	"author_id" text,
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"content" jsonb NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" text NOT NULL,
	"role_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"color" varchar(7) DEFAULT '#10b981',
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name"),
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "article_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" integer NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "author_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"bio" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "author_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
*/
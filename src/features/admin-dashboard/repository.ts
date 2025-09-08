import { eq } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "../plant-guides/schema";
import { Plants, NewPlant, NewArticle } from "./types";

import { articleStatusEnum, articleTable } from "../articles/schema";
import { ArticleStatusType } from "../articles/types";

export default function createAdminDashboardRepository(db: Db) {
  return {
    async addPlant(newPlant: NewPlant) {
      try {
        const result = await db
          .insert(plantTable)
          .values(newPlant)
          .returning({ id: plantTable.id });
        if (result.length > 0) {
          return { success: true, message: "Plant inserted successfully" };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
        };
      } catch (error) {
        if ((error as { code: string }).code === "23505") {
          return {
            success: false,
            message: "plant already registered.",
            error,
          };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
          error,
        };
      }
    },
    async addArticle(newArticle: NewArticle) {
      try {
        const result = await db
          .insert(articleTable)
          .values(newArticle)
          .returning({ id: articleTable.id });
        if (result.length > 0) {
          return { success: true, message: "Article inserted successfully" };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the article to the database, please try again.",
        };
      } catch (error) {
        if ((error as { code: string }).code === "23505") {
          return {
            success: false,
            message: "plant already registered.",
            error,
          };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
          error,
        };
      }
    },
    async getAllPlants(): Promise<Plants[]> {
      const plants = await db.select().from(plantTable);
      return plants;
    },
    async getAllArticles() {
      const articles = await db.select().from(articleTable);
      return articles;
    },
    async deletePlant(PlantId: number) {
      await db.delete(plantTable).where(eq(plantTable.id, PlantId));
    },
    async deleteArticle(articleId: number) {
      await db.delete(articleTable).where(eq(articleTable.id, articleId));
    },
    async updateArticleStatus(articleId: number, status: ArticleStatusType) {
      await db
        .update(articleTable)
        .set({
          status: status,
        })
        .where(eq(articleTable.id, articleId))
        .returning({ status: articleTable.status });
    },
  };
}

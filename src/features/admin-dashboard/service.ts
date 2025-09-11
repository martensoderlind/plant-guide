import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { Plants, NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema } from "./validate";
import { ArticleStatusType } from "../articles/types";

export default function createAdminDashboardService(
  db: Db,
  getAllPlantsGuides: () => Promise<Plants[]>
) {
  const repository = createAdminDashboardRepository(db);
  return {
    async getAllPlants() {
      const plants = await repository.getAllPlants();
      return plants;
    },
    async getAllArticles() {
      const articles = await repository.getAllArticles();
      return articles;
    },
    async addPlant(plant: NewPlant) {
      const validatedPlant = plantSchema.safeParse(plant);
      if (validatedPlant.success) {
        const result = await repository.addPlant(plant);
        return result;
      } else {
        return {
          success: false,
          message: validatedPlant.error.issues[0].message,
        };
      }
    },
    async addArticle(article: NewArticle) {
      const validatedArticle = articleSchema.safeParse(article);
      if (validatedArticle.success) {
        const result = await repository.addArticle(article);
        return result;
      } else {
        return {
          success: false,
          message: validatedArticle.error.issues[0].message,
        };
      }
    },
    async deletePlant(id: number) {
      const result = await repository.deletePlant(id);
    },
    async deleteArticle(id: number) {
      const result = await repository.deleteArticle(id);
    },
    async updateStatus(id: number, newStatus: ArticleStatusType) {
      if (newStatus === "published") {
        const published_at = new Date();
        repository.updateArticleStatusPublished(id, newStatus, published_at);
      }
      await repository.updateArticleStatus(id, newStatus);
    },
  };
}

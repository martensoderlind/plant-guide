import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema } from "./validate";
import { ArticleStatusType } from "../articles/types";
import addPlant from "./actions";
import { PlantGuideService } from "../plant-guides/types";

export default function createAdminDashboardService(
  db: Db,
  plantGuideService: PlantGuideService
) {
  const repository = createAdminDashboardRepository(db);
  return {
    async getAllPlants() {
      const plants = await plantGuideService.getAllPlantGuides();
      return plants;
    },
    async getAllArticles() {
      const articles = await repository.getAllArticles();
      return articles;
    },
    async addPlant(plant: NewPlant) {
      const validatedPlant = plantSchema.safeParse(plant);
      if (validatedPlant.success) {
        const result = await plantGuideService.addPlant(plant);
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
      await plantGuideService.deletePlantGuide(id);
    },
    async deleteArticle(id: number) {
      await repository.deleteArticle(id);
    },
    async updateStatus(id: number, newStatus: ArticleStatusType) {
      //change name to updateArticleStatus
      if (newStatus === "published") {
        const published_at = new Date();
        repository.updateArticleStatusPublished(id, newStatus, published_at);
      }
      await repository.updateArticleStatus(id, newStatus);
    },
  };
}

import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema } from "./validate";
import { ArticleService, ArticleStatusType } from "../articles/types";
import { PlantGuideService } from "../plant-guides/types";
import { iamService } from "../iam/instance";
import { IamService } from "../iam/types";

export default function createAdminDashboardService(
  db: Db,
  plantGuideService: PlantGuideService,
  articleService: ArticleService,
  iamService: IamService
) {
  const repository = createAdminDashboardRepository(db);
  return {
    async getAllUsers() {
      const users = await iamService.getAllUsers();
      return users;
    },
    async getAllPlants() {
      const plants = await plantGuideService.getAllPlantGuides();
      return plants;
    },
    async getAllArticles() {
      const articles = await articleService.getAllArticles();
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
        const result = await articleService.addArticle(article);
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
      await articleService.deleteArticle(id);
    },
    async updateArticleStatus(id: number, newStatus: ArticleStatusType) {
      if (newStatus === "published") {
        const published_at = new Date();
        await articleService.updateArticleStatusPublished(
          id,
          newStatus,
          published_at
        );
      }
      await articleService.updateArticleStatus(id, newStatus);
    },
    async getPlantGuideCount() {
      const plantGuideCount = await plantGuideService.plantCount();
      return plantGuideCount;
    },
    async getArticleCount() {
      const articleCount = await articleService.articleCount();
      return articleCount;
    },
    async getPublishedArticleCount() {
      const articleCount = await articleService.publishedArticleCount();
      return articleCount;
    },
    async getArticleViews() {
      const articleViews = await articleService.articleViews();
      return articleViews;
    },
  };
}

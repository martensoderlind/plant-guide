import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema, newUserSchema } from "./validate";
import { ArticleService, ArticleStatusType } from "../articles/types";
import { PlantGuideService } from "../plant-guides/types";
import { IamService, NewUser } from "../iam/types";
import { error } from "console";
import { formatErrors } from "./logic";

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
    async getUserRoles() {
      const articles = await iamService.getUserRoles();
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
        return {
          success: true,
          message: result.message,
          error: { "": "" },
        };
      } else {
        const errors = formatErrors(validatedArticle.error._zod.def);
        return {
          success: false,
          message: validatedArticle.error.issues[0].message,
          error: errors,
        };
      }
    },
    async addUser(user: NewUser) {
      const validatedUser = newUserSchema.safeParse(user);
      if (validatedUser.success) {
        const result = await iamService.createUser(user);
        return {
          success: true,
          message: result.message,
          error: { "": "" },
        };
      } else {
        const errors = formatErrors(validatedUser.error._zod.def);

        return {
          success: false,
          message: "validation error",
          error: errors,
        };
      }
    },
    async deletePlant(id: number) {
      await plantGuideService.deletePlantGuide(id);
    },
    async deleteArticle(id: number) {
      await articleService.deleteArticle(id);
    },
    async deleteUser(id: string) {
      await iamService.deleteUser(id);
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

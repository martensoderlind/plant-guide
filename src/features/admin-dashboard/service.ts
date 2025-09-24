import { Db } from "@/db";
import { NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema, newUserSchema } from "./validate";
import { ArticleService, ArticleStatusType } from "../articles/types";
import { PlantGuideService } from "../plant-guides/types";
import { IamService, NewUser } from "../iam/types";
import { formatErrors } from "./logic";

export default function createAdminDashboardService(
  db: Db,
  plantGuideService: PlantGuideService,
  articleService: ArticleService,
  iamService: IamService
) {
  return {
    async getAllUsers(currentPage: number) {
      const users = await iamService.getAllUsers(currentPage);
      return users;
    },
    async getAllPlants(currentPage: number) {
      const plants = await plantGuideService.getAllPlantGuides(currentPage);
      return plants;
    },
    async getAllArticles(currentPage: number) {
      const articles = await articleService.getAllArticles(currentPage);
      return articles;
    },
    async getUserRoles() {
      const articles = await iamService.getUserRoles();
      return articles;
    },
    async getUserCount() {
      const userCount = await iamService.getUserCount();
      return userCount;
    },

    async addPlant(plant: NewPlant) {
      const validatedPlant = plantSchema.safeParse(plant);
      if (validatedPlant.success) {
        const result = await plantGuideService.addPlant({ ...plant });
        return {
          success: true,
          message: result.message,
          error: { "": "" },
        };
      } else {
        const errors = formatErrors(validatedPlant.error._zod.def);
        return {
          success: false,
          message: "Follow the instructions in the form.",
          error: errors,
        };
      }
    },
    async addArticle(article: NewArticle, tagNames?: string[]) {
      const validatedArticle = articleSchema.safeParse(article);
      if (validatedArticle.success) {
        const result = await articleService.addArticle(article, tagNames);
        return {
          success: true,
          message: result.message,
          error: { "": "" },
        };
      } else {
        const errors = formatErrors(validatedArticle.error._zod.def);
        return {
          success: false,
          message: "Follow the instructions in the form.",
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
          message: "Follow the instructions in the form.",
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
      const result = await iamService.deleteUser(id);
      return result;
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
    async updatePlantFeaturedStatus(id: number, status: boolean) {
      const newStatus = !status;
      await plantGuideService.updatePlantFeaturedStatus(id, newStatus);
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
    
    // Tag management methods
    async getAllTags() {
      return await articleService.getAllTags();
    },
  };
}

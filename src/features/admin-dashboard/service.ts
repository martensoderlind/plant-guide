import { Db } from "@/db";
import { NewPlant, NewArticle } from "./types";
import { plantSchema, articleSchema, newUserSchema } from "./validate";
import {
  ArticleService,
  ArticleStatusEnums,
  UpdatedArticle,
} from "../articles/types";
import { PlantGuideService } from "../plant-guides/types";
import { NewUser, UpdateUser } from "../user/types";
import { formatErrors } from "./logic";
import { UserService } from "../user/types";
import { Plant } from "../plant-guides/schema";

export default function createAdminDashboardService(
  db: Db,
  plantGuideService: PlantGuideService,
  articleService: ArticleService,
  userService: UserService
) {
  return {
    async getAllUsers(currentPage: number) {
      const users = await userService.getAllUsers(currentPage);
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
      const articles = await userService.getUserRoles();
      return articles;
    },
    async getUserCount() {
      const userCount = await userService.getUserCount();
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
          message: "Follow the instructions in the form.",
          error: errors,
        };
      }
    },
    async addUser(user: NewUser) {
      const validatedUser = newUserSchema.safeParse(user);
      if (validatedUser.success) {
        const result = await userService.createUser(user);
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
      const result = await userService.deleteUser(id);
      return result;
    },
    async updateArticleStatus(id: number, NewStatus: ArticleStatusEnums) {
      if (NewStatus === "published") {
        const published_at = new Date();
        return await articleService.updateArticleStatusPublished({
          id,
          NewStatus,
          published_at,
        });
      }
      return await articleService.updateArticleStatus({ id, NewStatus });
    },
    async updateUser(user: UpdateUser) {
      const result = await userService.updateUser(user);
      return result;
    },
    async updatePlant(plant: Plant) {
      const validatedPlant = plantSchema.safeParse(plant);
      if (validatedPlant.success) {
        const result = await plantGuideService.updatePlant(plant);
        return {
          success: result.success,
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
    async updateArticle(updatedArticle: UpdatedArticle) {
      const validatedArticle = articleSchema.safeParse(updatedArticle);
      if (validatedArticle.success) {
        const result = await articleService.updateArticle(updatedArticle);
        return {
          success: result.success,
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
    async updateUserRole(id: string, newRole: string) {
      const result = await userService.updateUserRole(id, undefined, newRole);
      return result;
    },
    async updatePlantFeaturedStatus(id: number, status: boolean) {
      const newStatus = !status;
      await plantGuideService.updatePlantFeaturedStatus({ id, newStatus });
    },
    async getPlantGuideCount() {
      const plantGuideCount = await plantGuideService.plantCount();
      return plantGuideCount;
    },
    async getArticleCount() {
      const articleCount = await articleService.getArticleCount();
      return articleCount;
    },
    async getPublishedArticleCount() {
      const articleCount = await articleService.getPublishedArticleCount();
      return articleCount;
    },
    async getArticleViews() {
      return await articleService.getArticleViews();
    },
    async getAllTags() {
      return await articleService.getAllTags();
    },
    async getArticleTags(id: number) {
      return await articleService.getArticleTags(id);
    },
  };
}

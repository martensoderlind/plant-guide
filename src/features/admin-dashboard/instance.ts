import { db } from "@/db/index";
import createAdminDashboardService from "./service";
import { plantGuidesService } from "../plant-guides/instance";
import { articlesService } from "../articles/instance";
import { iamService } from "../iam/instance";

export const adminDashboardService = createAdminDashboardService(
  db,
  {
    plantCount: plantGuidesService.totalPlantGuideCount,
    getAllPlantGuides: plantGuidesService.getAllPlantGuides,
    addPlant: plantGuidesService.addPlant,
    deletePlantGuide: plantGuidesService.deletePlant,
  },
  {
    incrementLikes: articlesService.incrementLikes,
    getAllArticles: articlesService.getAllArticles,
    addArticle: articlesService.addArticle,
    deleteArticle: articlesService.deleteArticle,
    updateArticleStatusPublished: articlesService.updateArticleStatusPublished,
    updateArticleStatus: articlesService.updateArticleStatus,
    articleCount: articlesService.totalArticleCount,
    publishedArticleCount: articlesService.publishedArticleCount,
    articleViews: articlesService.totalArticleViews,
  },
  {
    getAllUsers: iamService.getAllUsers,
    createUser: iamService.createUser,
    deleteUser: iamService.deleteUser,
    updateUserRole: iamService.updateUserRole,
    getUserRoles: iamService.getUserRoles,
    getArticleAuthor: iamService.getArticleAuthor,
  }
);

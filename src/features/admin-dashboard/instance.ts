import { db } from "@/db/index";
import createAdminDashboardService from "./service";
import { plantGuidesService } from "../plant-guides/instance";
import { articlesService } from "../articles/instance";
import { userService } from "../user/instance";

export const adminDashboardService = createAdminDashboardService(
  db,
  {
    plantCount: plantGuidesService.totalPlantGuideCount,
    getAllPlantGuides: plantGuidesService.getAllPlantGuides,
    addPlant: plantGuidesService.addPlant,
    deletePlantGuide: plantGuidesService.deletePlant,
    getPlantGuide: plantGuidesService.getPlantGuide,
    getFeaturedPlantGuides: plantGuidesService.getFeaturedPlantGuides,
    updatePlantFeaturedStatus: plantGuidesService.updateFeatureStatus,
    totalPlantGuideCount: plantGuidesService.totalPlantGuideCount,
    updatePlant: plantGuidesService.updatePlant,
  },
  {
    incrementLikes: articlesService.incrementLikes,
    getAllArticles: articlesService.getAllArticles,
    addArticle: articlesService.addArticle,
    deleteArticle: articlesService.deleteArticle,
    updateArticleStatusPublished: articlesService.updateArticleStatusPublished,
    updateArticleStatus: articlesService.updateArticleStatus,
    getArticleCount: articlesService.getArticleCount,
    getArticleViews: articlesService.getArticleViews,
    getAllTags: articlesService.getAllTags,
    getArticleTags: articlesService.getArticleTags,
    getArticle: articlesService.getArticle,
    getPublishedArticleCount: articlesService.getPublishedArticleCount,
    getAllPublishedArticles: articlesService.getAllPublishedArticles,
    incrementArticleViews: articlesService.incrementArticleViews,
    getArticleAuthor: articlesService.getArticleAuthor,
  },
  {
    getAllUsers: userService.getAllUsers,
    createUser: userService.createUser,
    deleteUser: userService.deleteUser,
    updateUserRole: userService.updateUserRole,
    getUserRoles: userService.getUserRoles,
    getArticleAuthor: userService.getArticleAuthor,
    getUserCount: userService.getUserCount,
    updateUser: userService.updateUser,
  }
);

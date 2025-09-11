import { db } from "@/db/index";
import createArticlesService from "./service";
import { plantGuidesService } from "../plant-guides/instance";

export const articlesService = createArticlesService(db, {
  plantCount: plantGuidesService.totalPlantGuideCount,
});

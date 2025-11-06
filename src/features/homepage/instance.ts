import { db } from "@/db/index";
import { plantGuidesService } from "../plant-guides/instance";
import createHomePageService from "./service";

export const homePageService = createHomePageService(db, {
  plantCount: plantGuidesService.totalPlantGuideCount,
  getAllPlantGuides: plantGuidesService.getAllPlantGuides,
  addPlant: plantGuidesService.addPlant,
  deletePlantGuide: plantGuidesService.deletePlant,
  getPlantGuide: plantGuidesService.getPlantGuide,
  getFeaturedPlantGuides: plantGuidesService.getFeaturedPlantGuides,
  updatePlantFeaturedStatus: plantGuidesService.updateFeatureStatus,
  totalPlantGuideCount: plantGuidesService.totalPlantGuideCount,
});

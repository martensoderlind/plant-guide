import { db } from "@/db/index";
import createAdminDashboardService from "./service";
import { plantGuidesService } from "../plant-guides/instance";

export const adminDashboardService = createAdminDashboardService(db, {
  plantCount: plantGuidesService.totalPlantGuideCount,
  getAllPlantGuides: plantGuidesService.getAllPlantGuides,
  addPlant: plantGuidesService.addPlant,
  deletePlantGuide: plantGuidesService.deletePlant,
});

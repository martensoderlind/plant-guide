import { db } from "@/db/index";
import createAdminDashboardService from "./service";
import { plantGuidesService } from "../plant-guides/instance";

export const adminDashboardServiceService = createAdminDashboardService(
  db,
  plantGuidesService.getAllPlantGuides
);

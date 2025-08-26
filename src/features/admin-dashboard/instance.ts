import { db } from "@/db/index";
import createAdminDashboardService from "./service";
import { plantGuidesService } from "../plant-guides/instance";

export const adminDashboardService = createAdminDashboardService(
  db,
  plantGuidesService.getAllPlantGuides
);

import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { Plants } from "./types";

export default function createAdminDashboardService(
  db: Db,
  getAllPlantsGuides: () => Promise<Plants[]>
) {
  const repository = createAdminDashboardRepository(db);
  return {
    async getAllPlants() {
      const plants = await getAllPlantsGuides();
      return plants;
    },
  };
}

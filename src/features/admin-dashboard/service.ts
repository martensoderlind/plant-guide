import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { Plants, NewPlant } from "./types";

export default function createAdminDashboardService(
  db: Db,
  getAllPlantsGuides: () => Promise<Plants[]>
) {
  const repository = createAdminDashboardRepository(db);
  return {
    async getAllPlants() {
      const plants = await repository.getAllPlants();
      return plants;
    },
    async addPlant(plant: NewPlant) {
      const result = await repository.addPlant(plant);
      return result;
    },
    async deletePlant(id: number) {
      const result = await repository.deletePlant(id);
    },
  };
}

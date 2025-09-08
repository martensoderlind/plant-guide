import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";
import { Plants, NewPlant } from "./types";
import { plantSchema } from "./validate";
import { success } from "zod";

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
      const validatedPlant = plantSchema.safeParse(plant);
      if (validatedPlant.success) {
        console.log("validation successful!");
        const result = await repository.addPlant(plant);
        return result;
      } else {
        return {
          success: false,
          message: validatedPlant.error.issues[0].message,
        };
      }
    },
    async deletePlant(id: number) {
      const result = await repository.deletePlant(id);
    },
  };
}

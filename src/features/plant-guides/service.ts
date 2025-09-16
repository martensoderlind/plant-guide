import { Db } from "@/db";
import createPlantGuidesRepository from "./repository";
import { NewPlant } from "./types";

export default function createPlantGuidesService(db: Db) {
  const repository = createPlantGuidesRepository(db);
  return {
    async getAllPlantGuides() {
      return await repository.getAllPlantGuides();
    },
    async totalPlantGuideCount() {
      return await repository.totalPlantGuideCount();
    },
    async addPlant(plant: NewPlant) {
      const result = await repository.addPlant(plant);
      return result;
    },
    async deletePlant(id: number) {
      await repository.deletePlant(id);
    },
  };
}

import { Db } from "@/db";
import createPlantGuidesRepository from "./repository";

export default function createPlantGuidesService(db: Db) {
  const repository = createPlantGuidesRepository(db);
  return {
    async getAllPlantGuides() {
      return await repository.getAllPlantGuides();
    },
    async totalPlantGuideCount() {
      return await repository.totalPlantGuideCount();
    },
  };
}

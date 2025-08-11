import { Db } from "@/db";
import createPlantGuidesRepository from "./repository";

export default function createPlantGuidesService(db: Db) {
  const repository = createPlantGuidesRepository(db);
  return {
    async getAll() {
      return await repository.getAllPlantGuides();
    },
  };
}

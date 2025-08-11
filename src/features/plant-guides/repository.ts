import { Db } from "../../db/index";
import { plantTable } from "./schema";

export default function createPlantGuidesRepository(db: Db) {
  return {
    async getAllPlantGuides() {
      return await db.select().from(plantTable);
    },
  };
}

import { sql } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "./schema";

export default function createPlantGuidesRepository(db: Db) {
  return {
    async getAllPlantGuides() {
      return await db.select().from(plantTable);
    },
    async totalPlantGuideCount() {
      const plantGuideCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(plantTable);
      return plantGuideCount[0].count;
    },
  };
}

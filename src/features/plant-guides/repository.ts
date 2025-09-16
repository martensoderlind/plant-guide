import { eq, sql } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "./schema";
import { NewPlant } from "./types";

export default function createPlantGuidesRepository(db: Db) {
  return {
    async getAllPlantGuides() {
      return await db.select().from(plantTable);
    },
    async deletePlant(PlantId: number) {
      await db.delete(plantTable).where(eq(plantTable.id, PlantId));
    },
    async totalPlantGuideCount() {
      const plantGuideCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(plantTable);
      return plantGuideCount[0].count;
    },
    async addPlant(newPlant: NewPlant) {
      try {
        const result = await db
          .insert(plantTable)
          .values(newPlant)
          .returning({ id: plantTable.id });
        if (result.length > 0) {
          return { success: true, message: "Plant inserted successfully" };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
        };
      } catch (error) {
        if ((error as { code: string }).code === "23505") {
          return {
            success: false,
            message: "plant already registered.",
            error,
          };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
          error,
        };
      }
    },
  };
}

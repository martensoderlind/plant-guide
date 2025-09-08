import { eq } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "../plant-guides/schema";
import { Plants, NewPlant } from "./types";

export default function createAdminDashboardRepository(db: Db) {
  return {
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
        if ((error as any).code === "23505") {
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
    async getAllPlants(): Promise<Plants[]> {
      const plants = await db.select().from(plantTable);
      return plants;
    },
    async deletePlant(PlantId: number) {
      await db.delete(plantTable).where(eq(plantTable.id, PlantId));
    },
  };
}

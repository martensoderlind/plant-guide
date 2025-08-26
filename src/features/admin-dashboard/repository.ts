import { eq } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "../plant-guides/schema";
import { Plants, NewPlant } from "./types";

export default function createAdminDashboardRepository(db: Db) {
  return {
    async addPlant(newPlant: NewPlant) {
      await db.insert(plantTable).values(newPlant);
      return { message: "Ok" };
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

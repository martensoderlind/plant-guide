import { Db } from "../../db/index";
import { plantTable } from "../plant-guides/schema";
import { Plants, NewPlant } from "./types";

export default function createAdminDashboardRepository(db: Db) {
  return {
    async addPlant(newPlant: NewPlant) {
      // console.log("newPlant: ", newPlant);
      await db.insert(plantTable).values(newPlant);
      return { message: "Ok" };
    },
    async getAllPlants(): Promise<Plants[]> {
      const plants = await db.select().from(plantTable);
      return plants;
    },
  };
}

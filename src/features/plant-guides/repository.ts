import { eq, sql } from "drizzle-orm";
import { Db } from "../../db/index";
import { Plant, plantTable } from "./schema";
import { NewPlant } from "./types";

export default function createPlantGuidesRepository(db: Db) {
  return {
    async getAllPlantGuides(currentPage: number) {
      const pageSize = 6;
      return await db
        .select()
        .from(plantTable)
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
    },
    async getFeaturedPlantGuides() {
      return await db
        .select()
        .from(plantTable)
        .where(eq(plantTable.is_featured, true));
    },
    async getPlantGuide(slug: string) {
      const result = await db
        .select()
        .from(plantTable)
        .where(eq(plantTable.slug, slug));
      return result[0];
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

    async updateFeaturedStatus(id: number, newStatus: boolean) {
      await db
        .update(plantTable)
        .set({ is_featured: newStatus })
        .where(eq(plantTable.id, id));
    },
    async updatePlant(plant: Plant) {
      const { id, ...updateData } = plant;

      const result = await db
        .update(plantTable)
        .set(updateData)
        .where(eq(plantTable.id, id))
        .returning();

      if (result.length > 0) {
        return {
          success: true,
          message: "Plant updated successfully",
        };
      } else {
        return {
          success: false,
          message:
            "There was a problem with updating the plant in the database, please try again.",
        };
      }
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

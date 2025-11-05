import { Db } from "@/db";
import createPlantGuidesRepository from "./repository";
import { FeaturedStatus, NewPlant } from "./types";

export default function createPlantGuidesService(db: Db) {
  const repository = createPlantGuidesRepository(db);
  return {
    async getAllPlantGuides(currentPage: number) {
      return await repository.getAllPlantGuides(currentPage);
    },
    async getPlantGuide(slug: string) {
      return await repository.getPlantGuide(slug);
    },
    async getFeaturedPlantGuides() {
      return await repository.getFeaturedPlantGuides();
    },
    async totalPlantGuideCount() {
      return await repository.totalPlantGuideCount();
    },
    async addPlant(plant: NewPlant) {
      const result = await repository.addPlant(plant);
      return result;
    },
    async updateFeatureStatus(FeaturedStatus: FeaturedStatus) {
      await repository.updateFeaturedStatus(
        FeaturedStatus.id,
        FeaturedStatus.newStatus
      );
    },
    async deletePlant(id: number) {
      await repository.deletePlant(id);
    },
  };
}

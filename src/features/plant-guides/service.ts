import { Db } from "@/db";
import createPlantGuidesRepository from "./repository";
import { FeaturedStatus, NewPlant } from "./types";
import { Plant } from "./schema";
import {
  formatCareLevel,
  formatCategory,
  formatHumidity,
  formatLightRequirement,
} from "./logic";

export default function createPlantGuidesService(db: Db) {
  const repository = createPlantGuidesRepository(db);
  return {
    async getAllPlantGuides(currentPage: number) {
      return await repository.getAllPlantGuides(currentPage);
    },
    async getPlantGuide(slug: string) {
      const {
        care_level,
        light_requirement,
        humidity_preference,
        plant_category,
        ...rest
      } = await repository.getPlantGuide(slug);

      return {
        ...rest,
        careLevel: formatCareLevel(care_level),
        lightRequirement: formatLightRequirement(light_requirement),
        humidityPreference: formatHumidity(humidity_preference),
        category: formatCategory(plant_category),
      };
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
      const result = await repository.updateFeaturedStatus(
        FeaturedStatus.id,
        FeaturedStatus.newStatus
      );
      return result;
    },
    async updatePlant(plant: Plant) {
      return await repository.updatePlant(plant);
    },
    async deletePlant(id: number) {
      await repository.deletePlant(id);
    },
  };
}

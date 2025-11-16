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
      const plantGuide = await repository.getPlantGuide(slug);
      const careLevel = formatCareLevel(plantGuide.care_level);
      const lightReq = formatLightRequirement(plantGuide.light_requirement);
      const humidity = formatHumidity(plantGuide.humidity_preference);
      const category = formatCategory(plantGuide.plant_category);
      return { ...plantGuide, careLevel, lightReq, humidity, category };
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

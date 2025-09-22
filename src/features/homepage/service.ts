import { Db } from "@/db";
import { PlantGuideService } from "../plant-guides/types";

export default function createHomePageService(
  db: Db,
  plantGuideService: PlantGuideService
) {
  return {
    async getFeaturedPlantGuides() {
      return await plantGuideService.getFeaturedPlantGuides();
    },
  };
}

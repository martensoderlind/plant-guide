import { PermissionSchema } from "../types";
import { PlantGuideService } from "@/features/plant-guides/types";

export const plantGuides: PermissionSchema<"plantGuides", PlantGuideService> = {
  plantCount: "plantGuides.plantCount",
  addPlant: "plantGuides.addPlant",
  getAllPlantGuides: "plantGuides.getAllPlantGuides",
  getPlantGuide: "plantGuides.getPlantGuide",
  getFeaturedPlantGuides: "plantGuides.getFeaturedPlantGuides",
  deletePlantGuide: "plantGuides.deletePlantGuide",
  updatePlantFeaturedStatus: "plantGuides.updatePlantFeaturedStatus",
};

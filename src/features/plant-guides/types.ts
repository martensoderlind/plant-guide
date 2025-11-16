import { plantCategoryEnum, Plant } from "./schema";
import createPlantGuidesService from "./service";

export type LightReq = {
  text: string;
  intensity: string;
};
export type Humidity = {
  text: string;
  level: string;
};
export type CareLevel = {
  text: string;
  color: string;
};

export type FeaturedStatus = {
  id: number;
  newStatus: boolean;
};

export type NewPlant = Omit<Plant, "id" | "created_at" | "updated_at">;

// export type CareLevel = (typeof careLevelEnum.enumValues)[number];
// export type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
// export type HumidityPreference =
//   (typeof humidityPreferenceEnum.enumValues)[number];
export type PlantCategoryEnum = (typeof plantCategoryEnum.enumValues)[number];

type plantGuidesService = ReturnType<typeof createPlantGuidesService>;

export type PlantGuideService = {
  plantCount: plantGuidesService["totalPlantGuideCount"];
  addPlant: plantGuidesService["addPlant"];
  getAllPlantGuides: plantGuidesService["getAllPlantGuides"];
  getPlantGuide: plantGuidesService["getPlantGuide"];
  getFeaturedPlantGuides: plantGuidesService["getFeaturedPlantGuides"];
  deletePlantGuide: plantGuidesService["deletePlant"];
  updatePlantFeaturedStatus: plantGuidesService["updateFeatureStatus"];
  totalPlantGuideCount: plantGuidesService["totalPlantGuideCount"];
  updatePlant: plantGuidesService["updatePlant"];
};

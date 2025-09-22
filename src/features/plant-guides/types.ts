import {
  careLevelEnum,
  lightRequirementEnum,
  humidityPreferenceEnum,
  plantCategoryEnum,
  Plant,
} from "./schema";
import createPlantGuidesService from "./service";

export type NewPlant = Omit<Plant, "id" | "created_at" | "updated_at">;

export type CareLevel = (typeof careLevelEnum.enumValues)[number];
export type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
export type HumidityPreference =
  (typeof humidityPreferenceEnum.enumValues)[number];
export type PlantCategory = (typeof plantCategoryEnum.enumValues)[number];

type plantGuidesService = ReturnType<typeof createPlantGuidesService>;

export type PlantGuideService = {
  plantCount: plantGuidesService["totalPlantGuideCount"];
  addPlant: plantGuidesService["addPlant"];
  getAllPlantGuides: plantGuidesService["getAllPlantGuides"];
  getPlantGuide: plantGuidesService["getPlantGuide"];
  getFeaturedPlantGuides: plantGuidesService["getFeaturedPlantGuides"];
  deletePlantGuide: plantGuidesService["deletePlant"];
};

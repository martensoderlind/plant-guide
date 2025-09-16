import {
  careLevelEnum,
  lightRequirementEnum,
  humidityPreferenceEnum,
  plantCategoryEnum,
} from "./schema";
import createPlantGuidesService from "./service";

export type CareLevel = (typeof careLevelEnum.enumValues)[number];
export type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
export type HumidityPreference =
  (typeof humidityPreferenceEnum.enumValues)[number];
export type PlantCategory = (typeof plantCategoryEnum.enumValues)[number];

type plantGuidesService = ReturnType<typeof createPlantGuidesService>;

export type PlantGuideService = {
  // plantCount: plantGuidesService["totalPlantGuideCount"];
  addPlant: plantGuidesService["addPlant"];
  getAllPlantGuides: plantGuidesService["getAllPlantGuides"];
  deletePlantGuide: plantGuidesService["deletePlant"];
};

import {
  careLevelEnum,
  lightRequirementEnum,
  humidityPreferenceEnum,
  plantCategoryEnum,
} from "./schema";

export type CareLevel = (typeof careLevelEnum.enumValues)[number];
export type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
export type HumidityPreference =
  (typeof humidityPreferenceEnum.enumValues)[number];
export type PlantCategory = (typeof plantCategoryEnum.enumValues)[number];

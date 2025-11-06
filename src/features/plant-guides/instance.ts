import { db } from "@/db/index";
import createPlantGuidesService from "./service";
import { securedService } from "../iam/secured-service";

export const insecurePlantGuidesService = createPlantGuidesService(db);

export const plantGuidesService = securedService(
  "plantGuides",
  insecurePlantGuidesService
);

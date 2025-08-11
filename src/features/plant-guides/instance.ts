import { db } from "@/db/index";
import createPlantGuidesService from "./service";

export const plantGuidesService = createPlantGuidesService(db);

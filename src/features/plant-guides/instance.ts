import { db } from "@/db/index";
import createPlantGuidesService from "./service";

const articlesService = createPlantGuidesService(db);

import { eq } from "drizzle-orm";
import { Db } from "../../db/index";
import { plantTable } from "../plant-guides/schema";
import { Plants, NewPlant, NewArticle } from "./types";

import { articleStatusEnum, articleTable } from "../articles/schema";
import { ArticleStatusType } from "../articles/types";

export default function createAdminDashboardRepository(db: Db) {
  return {};
}

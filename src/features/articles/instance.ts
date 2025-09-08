import { db } from "@/db/index";
import createArticlesService from "./service";

export const articlesService = createArticlesService(db);

import { db } from "@/db/index";
import createArticlesService from "./service";

const articlesService = createArticlesService(db);

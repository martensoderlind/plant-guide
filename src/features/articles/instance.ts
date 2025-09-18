import { db } from "@/db/index";
import createArticlesService from "./service";
import { iamService } from "../iam/instance";

export const articlesService = createArticlesService(
  db,
  iamService.getArticleAuthor
);

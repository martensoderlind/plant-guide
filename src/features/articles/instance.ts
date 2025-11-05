import { db } from "@/db/index";
import createArticlesService from "./service";
import { userService } from "../user/instance";

export const articlesService = createArticlesService(
  db,
  userService.getArticleAuthor
);

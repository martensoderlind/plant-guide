import { db } from "@/db/index";
import createArticlesService from "./service";
import { userService } from "../user/instance";
import { securedService } from "../iam/secured-service";

const insecureArticlesService = createArticlesService(
  db,
  userService.getArticleAuthor
);

export const articlesService = securedService(
  "articles",
  insecureArticlesService
);

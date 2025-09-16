import { deleteArticle } from "../admin-dashboard/actions";
import { articleStatusEnum } from "./schema";
import createArticlesService from "./service";

export type ArticleStatusType = (typeof articleStatusEnum.enumValues)[number];

type articleService = ReturnType<typeof createArticlesService>;

export type ArticleService = {
  incrementLikes: articleService["incrementLikes"];
  getAllArticles: articleService["getAllArticles"];
  addArticle: articleService["addArticle"];
  deleteArticle: articleService["deleteArticle"];
};

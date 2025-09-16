import { Article, articleStatusEnum } from "./schema";
import createArticlesService from "./service";

export type NewArticle = Omit<
  Article,
  | "id"
  | "created_at"
  | "published_at"
  | "updated_at"
  | "reading_time_minutes"
  | "views"
  | "likes"
  | "author_id"
>;

export type ArticleStatusType = (typeof articleStatusEnum.enumValues)[number];

type articleService = ReturnType<typeof createArticlesService>;

export type ArticleService = {
  incrementLikes: articleService["incrementLikes"];
  getAllArticles: articleService["getAllArticles"];
  addArticle: articleService["addArticle"];
  deleteArticle: articleService["deleteArticle"];
  updateArticleStatusPublished: articleService["updateArticleStatusPublished"];
  updateArticleStatus: articleService["updateArticleStatus"];
  articleCount: articleService["totalArticleCount"];
  publishedArticleCount: articleService["publishedArticleCount"];
  articleViews: articleService["totalArticleViews"];
};

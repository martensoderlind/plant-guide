import { Article, articleStatusEnum } from "./schema";
import createArticlesService from "./service";

export type ArticleStatusPublished = {
  id: number;
  NewStatus: ArticleStatusType;
  published_at: Date;
};

export type ArticleStatus = Omit<ArticleStatusPublished, "published_at">;

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
> & {
  tag: string[];
};

export type ArticleStatusType = (typeof articleStatusEnum.enumValues)[number];

type articleService = ReturnType<typeof createArticlesService>;

export type ArticleService = {
  incrementLikes: articleService["incrementLikes"];
  getAllArticles: articleService["getAllArticles"];
  addArticle: articleService["addArticle"];
  deleteArticle: articleService["deleteArticle"];
  updateArticleStatusPublished: articleService["updateArticleStatusPublished"];
  updateArticleStatus: articleService["updateArticleStatus"];
  getArticleCount: articleService["totalArticleCount"];
  getPublishedArticleCount: articleService["publishedArticleCount"];
  articleViews: articleService["totalArticleViews"];
  getAllTags: articleService["getAllTags"];
  getArticle: articleService["getArticle"];
  getAllPublishedArticles: articleService["getAllPublishedArticles"];
  incrementArticleViews: articleService["incrementArticleViews"];
  getArticleAuthor: articleService["getArticleAuthor"];
};

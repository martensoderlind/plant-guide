import {
  Article,
  articleCategoryEnum,
  articleStatusEnum,
  difficultyLevelEnum,
} from "./schema";
import createArticlesService from "./service";

export type ArticleStatusPublished = {
  id: number;
  NewStatus: ArticleStatusType;
  published_at: Date;
};

export type ArticleStatus = Omit<ArticleStatusPublished, "published_at">;

export type ArticleCategoryEnums =
  (typeof articleCategoryEnum.enumValues)[number];
export type DifficultyLevelEnums =
  (typeof difficultyLevelEnum.enumValues)[number];
export type ArticleStatusEnums = (typeof articleStatusEnum.enumValues)[number];

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

export type UpdatedArticle = Omit<Article, "views" | "likes" | "author_id"> & {
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
  getPublishedArticleCount: articleService["getPublishedArticleCount"];
  getArticleViews: articleService["getArticleViews"];
  getAllTags: articleService["getAllTags"];
  getArticleTags: articleService["getArticleTags"];
  getArticle: articleService["getArticle"];
  getAllPublishedArticles: articleService["getAllPublishedArticles"];
  incrementArticleViews: articleService["incrementArticleViews"];
  getArticleAuthor: articleService["getArticleAuthor"];
  updateArticle: articleService["updateArticle"];
};

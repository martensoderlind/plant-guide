import { ArticleService } from "@/features/articles/types";
import { PermissionSchema } from "../types";

export const articles: PermissionSchema<"articles", ArticleService> = {
  incrementLikes: "articles.incrementLikes",
  getAllArticles: "articles.getAllArticles",
  addArticle: "articles.addArticle",
  deleteArticle: "articles.deleteArticle",
  updateArticleStatusPublished: "articles.updateArticleStatusPublished",
  updateArticleStatus: "articles.updateArticleStatus",
  getArticleCount: "articles.getArticleCount",
  getArticleViews: "articles.getArticleViews",
  getAllTags: "articles.getAllTags",
  getPublishedArticleCount: "articles.getPublishedArticleCount",
  getArticle: "articles.getArticle",
  getAllPublishedArticles: "articles.getAllPublishedArticles",
  incrementArticleViews: "articles.incrementArticleViews",
  getArticleAuthor: "articles.getArticleAuthor",
  getArticleTags: "articles.getArticleTags",
  updateArticle: "articles.updateArticle",
};

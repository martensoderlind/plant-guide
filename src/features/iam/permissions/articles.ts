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
  articleViews: "articles.articleViews",
  getAllTags: "articles.getAllTags",
  getPublishedArticleCount: "articles.getPublishedArticleCount",
  getArticle: "articles.getArticle",
  getAllPublishedArticles: "articles.getAllPublishedArticles",
  incrementArticleViews: "articles.incrementArticleViews",
  getArticleAuthor: "articles.getArticleAuthor",
};

import { ArticleService } from "@/features/articles/types";
import { PermissionSchema } from "../types";

export const articles: PermissionSchema<"articles", ArticleService> = {
  incrementLikes: "articles.incrementLikes",
  getAllArticles: "articles.getAllArticles",
  addArticle: "articles.addArticle",
  deleteArticle: "articles.deleteArticle",
  updateArticleStatusPublished: "articles.updateArticleStatusPublished",
  updateArticleStatus: "articles.updateArticleStatus",
  articleCount: "articles.articleCount",
  publishedArticleCount: "articles.publishedArticleCount",
  articleViews: "articles.articleViews",
  getAllTags: "articles.getAllTags",
};

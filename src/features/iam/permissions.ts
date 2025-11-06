import { articles } from "./permissions/articles";
import { plantGuides } from "./permissions/plant-guides";
import { users } from "./permissions/user";

export const rolesPermissions = {
  admin: new Set([
    ...Object.values(plantGuides),
    ...Object.values(articles),
    ...Object.values(users),
  ]),
  user: new Set([]),
  author: new Set([]),
  moderator: new Set([]),
  guest: new Set([
    plantGuides.getAllPlantGuides,
    articles.getArticleCount,
    articles.getPublishedArticleCount,
    articles.getArticle,
    articles.getAllPublishedArticles,
    articles.incrementLikes,
    articles.incrementArticleViews,
    articles.getArticleAuthor,
    users.getArticleAuthor,
  ]),
} as const;

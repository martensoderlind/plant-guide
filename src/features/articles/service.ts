import { Db } from "@/db";
import createArticlesRepository from "./repository";
import { PlantGuideService } from "../plant-guides/types";
import { NewArticle } from "../admin-dashboard/types";
import { ArticleStatusType } from "./types";

export default function createArticlesService(db: Db) {
  const repository = createArticlesRepository(db);
  return {
    async getAllArticles() {
      return await repository.getAllArticles();
    },
    async getAllPublishedArticles() {
      return await repository.getAllPublishedArticles();
    },
    async getArticle(slug: string) {
      return await repository.getArticle(slug);
    },
    async incrementLikes(id: number) {
      return await repository.incrementLikes(id);
    },
    async incrementArticleViews(slug: string) {
      await repository.incrementArticleViews(slug);
    },
    async totalArticleCount() {
      await repository.totalArticlesCount();
    },
    async addArticle(article: NewArticle) {
      await repository.addArticle(article);
    },
    async deleteArticle(id: number) {
      await repository.deleteArticle(id);
    },
    async updateArticleStatusPublished(
      id: number,
      newStatus: ArticleStatusType,
      published_at: Date
    ) {
      repository.updateArticleStatusPublished(id, newStatus, published_at);
    },
    async updateArticleStatus(id: number, newStatus: ArticleStatusType) {
      repository.updateArticleStatus(id, newStatus);
    },
  };
}

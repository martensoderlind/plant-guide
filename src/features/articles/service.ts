import { Db } from "@/db";
import createArticlesRepository from "./repository";
import { NewArticle } from "./types";
import { ArticleStatusType } from "./types";
import { Author } from "../iam/types";

export default function createArticlesService(
  db: Db,
  getArticleAuthor: (id: string) => Promise<Author>
) {
  const repository = createArticlesRepository(db);
  return {
    async getAllArticles(currentPage: number) {
      return await repository.getAllArticles(currentPage);
    },
    async getAllPublishedArticles(currentPage: number) {
      return await repository.getAllPublishedArticles(currentPage);
    },
    async getArticle(slug: string) {
      return await repository.getArticle(slug);
    },
    async getArticleAuthor(id: string) {
      return await getArticleAuthor(id);
    },
    async getArticleCount() {
      return await repository.getArticleCount();
    },
    async incrementLikes(id: number) {
      return await repository.incrementLikes(id);
    },
    async incrementArticleViews(slug: string) {
      await repository.incrementArticleViews(slug);
    },
    async addArticle(article: NewArticle, tagNames?: string[]) {
      return await repository.addArticle(article, tagNames);
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
    async totalArticleCount() {
      const articleCount = await repository.totalArticlesCount();
      return articleCount;
    },
    async publishedArticleCount() {
      const publishedArticleCount = await repository.publishedArticlesCount();
      return publishedArticleCount;
    },
    async totalArticleViews() {
      const totalArticleViews = await repository.getArticleViews();
      return totalArticleViews;
    },
    
    // Tag management methods
    async getAllTags() {
      return await repository.getAllTags();
    },
    
    async getArticleTags(articleId: number) {
      return await repository.getArticleTags(articleId);
    },
  };
}

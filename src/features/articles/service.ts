import { Db } from "@/db";
import createArticlesRepository from "./repository";
import {
  ArticleStatus,
  ArticleStatusPublished,
  NewArticle,
  UpdatedArticle,
} from "./types";
import { Author } from "../user/types";
import { userService } from "../user/instance";

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
      const article = await repository.getArticle(slug);
      if (article) {
        const tags = await repository.getArticleTags(article.id);
        return { ...article, tags };
      }
      return article;
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
    async addArticle(article: NewArticle) {
      article.authorId = await userService.getAuthorId();
      return await repository.addArticle(article);
    },
    async deleteArticle(id: number) {
      await repository.deleteArticle(id);
    },
    async updateArticleStatusPublished(articleStatus: ArticleStatusPublished) {
      return await repository.updateArticleStatusPublished(
        articleStatus.id,
        articleStatus.NewStatus,
        articleStatus.published_at
      );
    },
    async updateArticle(updatedArticle: UpdatedArticle) {
      return await repository.updateArticle(updatedArticle);
    },
    async updateArticleStatus(articleStatus: ArticleStatus) {
      return repository.updateArticleStatus(
        articleStatus.id,
        articleStatus.NewStatus
      );
    },
    async totalArticleCount() {
      const articleCount = await repository.getArticleCount();
      return articleCount;
    },
    async getPublishedArticleCount() {
      const publishedArticleCount = await repository.publishedArticlesCount();
      return publishedArticleCount;
    },
    async getArticleViews() {
      const totalArticleViews = await repository.getArticleViews();
      return totalArticleViews;
    },
    async getAllTags() {
      return await repository.getAllTags();
    },
    async getArticleTags(articleId: number) {
      return await repository.getArticleTags(articleId);
    },
  };
}

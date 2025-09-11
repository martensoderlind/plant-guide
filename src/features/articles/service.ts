import { Db } from "@/db";
import createArticlesRepository from "./repository";

export default function createArticlesService(db: Db) {
  const repository = createArticlesRepository(db);
  return {
    async getAll() {
      return await repository.getAllArticles();
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
  };
}

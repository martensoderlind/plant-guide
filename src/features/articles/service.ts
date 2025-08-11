import { Db } from "@/db";
import createArticlesRepository from "./repository";

export default function createArticlesService(db: Db) {
  const repository = createArticlesRepository(db);
  return {
    async getAll() {
      return await repository.getAllArticles();
    },
  };
}

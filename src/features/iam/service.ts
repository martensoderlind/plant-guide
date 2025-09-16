import { Db } from "@/db";
import createIamRepository from "./repository";

export default function createIamService(db: Db) {
  const repository = createIamRepository(db);
  return {
    async getAllArticles() {},
  };
}

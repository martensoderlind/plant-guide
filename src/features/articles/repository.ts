import { Db } from "../../db/index";
import { plantTable } from "./schema";

export default function createArticlesRepository(db: Db) {
  return {
    async getAllArticles() {
      return await db.select().from(plantTable);
    },
  };
}

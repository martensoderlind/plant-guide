import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { plantTable } from "../plant-guides/schema";
import { articleTable } from "./schema";

export default function createArticlesRepository(db: Db) {
  return {
    async getAllArticles() {
      return await db.select().from(plantTable);
    },
    async getArticle(slug: string) {
      const article = await db
        .select()
        .from(articleTable)
        .where(eq(articleTable.slug, slug))
        .limit(1);
      if (article) {
        return article[0];
      }
      return undefined;
    },
    async incrementLikes(articleId: number) {
      const result = await db
        .update(articleTable)
        .set({
          likes: sql`COALESCE(${articleTable.likes}, 0) + 1`,
          updated_at: new Date(),
        })
        .where(eq(articleTable.id, articleId))
        .returning({ likes: articleTable.likes });
      return result;
    },
  };
}

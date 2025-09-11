import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { plantTable } from "../plant-guides/schema";
import { articleTable } from "./schema";

export default function createArticlesRepository(db: Db) {
  return {
    async getAllPublishedArticles() {
      return await db
        .select()
        .from(articleTable)
        .where(eq(articleTable.status, "published" as const));
    },
    async getArticle(slug: string) {
      const article = await db
        .select()
        .from(articleTable)
        .where(eq(articleTable.slug, slug))
        .limit(1);
      if (article && article[0].status === "published") {
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
    async incrementArticleViews(slug: string) {
      await db
        .update(articleTable)
        .set({
          views: sql`COALESCE(${articleTable.likes}, 0) + 1`,
        })
        .where(eq(articleTable.slug, slug));
    },
    async totalArticlesCount() {
      const articleCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(articleTable);
      return articleCount[0].count;
    },
  };
}

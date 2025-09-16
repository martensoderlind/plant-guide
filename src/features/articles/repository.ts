import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { articleTable } from "./schema";
import { NewArticle } from "../admin-dashboard/types";
import { ArticleStatusType } from "./types";

export default function createArticlesRepository(db: Db) {
  return {
    async getAllArticles() {
      const articles = await db.select().from(articleTable);
      return articles;
    },
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
    async addArticle(newArticle: NewArticle) {
      try {
        const result = await db
          .insert(articleTable)
          .values(newArticle)
          .returning({ id: articleTable.id });
        if (result.length > 0) {
          return { success: true, message: "Article inserted successfully" };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the article to the database, please try again.",
        };
      } catch (error) {
        if ((error as { code: string }).code === "23505") {
          return {
            success: false,
            message: "plant already registered.",
            error,
          };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the plant to the database, please try again.",
          error,
        };
      }
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
    async publishedArticlesCount() {
      const articleCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(articleTable)
        .where(eq(articleTable.status, "published" as const));
      console.log("articleCount:", articleCount);
      return articleCount[0].count;
    },
    async deleteArticle(articleId: number) {
      await db.delete(articleTable).where(eq(articleTable.id, articleId));
    },
    async updateArticleStatus(articleId: number, status: ArticleStatusType) {
      await db
        .update(articleTable)
        .set({
          status: status,
        })
        .where(eq(articleTable.id, articleId))
        .returning({ status: articleTable.status });
    },
    async updateArticleStatusPublished(
      articleId: number,
      status: ArticleStatusType,
      published_at: Date
    ) {
      await db
        .update(articleTable)
        .set({
          status: status,
          published_at: published_at,
        })
        .where(eq(articleTable.id, articleId))
        .returning({ status: articleTable.status });
    },
  };
}

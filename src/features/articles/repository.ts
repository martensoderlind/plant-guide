import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { articleTable, tagTable, articleTagTable } from "./schema";
import { NewArticle } from "./types";
import { ArticleStatusType } from "./types";

export default function createArticlesRepository(db: Db) {
  const pageSize = 6;
  return {
    async getAllArticles(currentPage: number) {
      const articles = await db
        .select()
        .from(articleTable)
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
      return articles;
    },
    async getAllPublishedArticles(currentPage: number) {
      return await db
        .select()
        .from(articleTable)
        .where(eq(articleTable.status, "published" as const))
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
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
    async getArticleCount() {
      const ArticleCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(articleTable);
      return ArticleCount[0].count;
    },
    async addArticle(newArticle: NewArticle, tagNames?: string[]) {
      try {
        const result = await db
          .insert(articleTable)
          .values(newArticle)
          .returning({ id: articleTable.id });

        if (result.length > 0 && tagNames && tagNames.length > 0) {
          await this.linkTagsToArticle(result[0].id, tagNames);
        }

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
            message: "article already registered.",
            error,
          };
        }
        return {
          success: false,
          message:
            "There was a problem with adding the article to the database, please try again.",
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
    async getArticleViews() {
      const totalArticleViews = await db
        .select({
          total: sql<number>`sum(${articleTable.views})`,
        })
        .from(articleTable);
      return totalArticleViews[0].total;
    },

    async getAllTags() {
      return await db.select().from(tagTable).orderBy(tagTable.name);
    },

    async createTag(name: string, slug: string, color?: string) {
      try {
        const result = await db
          .insert(tagTable)
          .values({ name, slug, color: color || "#10b981" })
          .returning({ id: tagTable.id, name: tagTable.name });
        return result[0];
      } catch (error) {
        if ((error as { code: string }).code === "23505") {
          const existingTag = await db
            .select()
            .from(tagTable)
            .where(eq(tagTable.name, name))
            .limit(1);
          return existingTag[0];
        }
        throw error;
      }
    },

    async linkTagsToArticle(articleId: number, tagNames: string[]) {
      for (const tagName of tagNames) {
        const slug = tagName.toLowerCase().replace(/\s+/g, "-");

        const tag = await this.createTag(tagName.trim(), slug);

        try {
          await db.insert(articleTagTable).values({
            article_id: articleId,
            tag_id: tag.id,
          });
        } catch (error) {
          if ((error as { code: string }).code !== "23505") {
            throw error;
          }
        }
      }
    },

    async getArticleTags(articleId: number) {
      return await db
        .select({
          id: tagTable.id,
          name: tagTable.name,
          slug: tagTable.slug,
          color: tagTable.color,
        })
        .from(tagTable)
        .innerJoin(articleTagTable, eq(tagTable.id, articleTagTable.tag_id))
        .where(eq(articleTagTable.article_id, articleId));
    },
  };
}

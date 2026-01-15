import Image from "next/image";
import { RenderContent } from "@/shared/components/render-content";
import { articlesService } from "../../instance";
import ArticleFallback from "../article-fallback";
import ArticleHeader from "./article-header";
import ArticleInfo from "./article-info";

type Prop = {
  slug: string;
};

export default async function Article({ slug }: Prop) {
  await articlesService.incrementArticleViews(slug);
  const article = await articlesService.getArticle(slug);
  if (!article) {
    return <ArticleFallback />;
  }

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <ArticleHeader article={article} tags={article.tags} />
      {article.featured_image_url && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
          <Image
            width={500}
            height={500}
            className="w-full h-64 md:h-96 object-cover"
            src={article.featured_image_url}
            alt={article.title}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <ArticleInfo article={article} />
        <article className="max-w-3xl">
          <section className="border-b border-gray-200">
            {article.excerpt && (
              <p className="text-lg mb-4 leading-relaxed text-gray-500">
                {article.excerpt}
              </p>
            )}
          </section>
          <section className="mt-4">
            <RenderContent content={article.content} />
          </section>
        </article>
      </div>
    </div>
  );
}

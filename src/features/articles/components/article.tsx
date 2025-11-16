import { articlesService } from "../instance";
import ArticleFooter from "./article-footer";
import Image from "next/image";
import ArticleInfo from "./article-info";
import { RenderContent } from "../../../components/render-content";
import ArticleHeader from "./article-header";

type Prop = {
  slug: string;
};

export default async function Article({ slug }: Prop) {
  await articlesService.incrementArticleViews(slug);
  const article = await articlesService.getArticle(slug);
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-8 flex flex-col justify-items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-200 mb-4 leading-tight mx-auto">
          No article with that name exist.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ArticleInfo
        published_at={article.published_at}
        reading_time_minutes={article.reading_time_minutes}
        views={article.views}
        likes={article.likes}
      />
      {article.featured_image_url && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            width={500}
            height={500}
            className="w-full h-64 md:h-96 object-cover"
            src={article.featured_image_url}
            alt={article.title}
          />
        </div>
      )}

      <ArticleHeader article={article} tags={article.tags} />

      <article>
        <section>
          <RenderContent content={article.content} />
        </section>
      </article>
      <ArticleFooter article={article} />
    </div>
  );
}

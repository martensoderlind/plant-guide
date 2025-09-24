import { articlesService } from "../instance";
import ArticleFooter from "./article-footer";
import Image from "next/image";
import ArticleInfo from "./article-info";

type Prop = {
  slug: string;
};

export default async function Article({ slug }: Prop) {
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
  await articlesService.incrementArticleViews(slug);

  const categoryNames = {
    basics: "Basics",
    watering: "Watering",
    lighting: "lighting",
    diseases: "Diseases",
    propagation: "Propagation",
    seasonal: "Seasonal",
    "air-purifying": "Air purifying",
    troubleshooting: "Troubleshooting",
    "advanced-techniques": "Advanced Techniques",
  };

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    advanced: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
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

      <header className="mb-8 border-b border-gray-200">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200">
            {categoryNames[article.category]}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              difficultyColors[article.difficulty_level]
            }`}
          >
            {article.difficulty_level}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4 leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none prose-emerald prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <ArticleFooter article={article} />
    </article>
  );
}

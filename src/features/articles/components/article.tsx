import { Calendar, Clock, Eye, Heart } from "lucide-react";
import { articlesService } from "../instance";
import ArticleFooter from "./article-footer";
import Image from "next/image";

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
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const categoryNames = {
    basics: "Advanced",
    watering: "Watering",
    lighting: "lighting",
    diseases: "Diseases",
    propagation: "Propagation",
    seasonal: "Seasonal",
    "air-purifying": "Air purifying",
    troubleshooting: "Troubleshooting",
    "advanced-techniques": "Advanced Techniques",
  };

  const difficultyNames = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    advanced: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
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

      <header className="mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200">
            {categoryNames[article.category]}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              difficultyColors[article.difficulty_level]
            }`}
          >
            {difficultyNames[article.difficulty_level]}
          </span>
          {article.is_featured && (
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
              Selected article
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4 leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        <div className="flex flex-wrap gap-6 text-sm text-gray-300 border-b border-gray-200 pb-6">
          {article.published_at && (
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Published {formatDate(article.published_at)}</span>
            </div>
          )}
          {article.reading_time_minutes && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{article.reading_time_minutes} estimated reading time</span>
            </div>
          )}
          {article.views && (
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{article.views.toLocaleString()} views</span>
            </div>
          )}
          {article.likes && (
            <div className="flex items-center gap-1">
              <Heart size={16} />
              <span>{article.likes} likes</span>
            </div>
          )}
        </div>
      </header>

      <div
        className="prose prose-lg max-w-none prose-emerald prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <ArticleFooter article={article} />
    </article>
  );
}

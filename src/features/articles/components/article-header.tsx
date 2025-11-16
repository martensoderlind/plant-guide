import { Article, Tag } from "../schema";

type Props = {
  article: Article;
  tags: Tag[];
};

export default function ArticleHeader({ article, tags }: Props) {
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
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold  mb-4 leading-tight">
        {article.title}
      </h1>

      {article.excerpt && (
        <p className="text-lg  mb-6 leading-relaxed">{article.excerpt}</p>
      )}
    </header>
  );
}

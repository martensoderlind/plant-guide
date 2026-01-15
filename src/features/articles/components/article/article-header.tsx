import { Article, Tag } from "../../schema";

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

  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl mb-4 leading-tight text-center">
        {article.title}
      </h1>
      <div className="flex flex-row justify-center gap-4 mb-4 flex-wrap gap-y-2">
        <div className="flex">
          <span className="px-3 py-1 text-emerald-800 rounded-full text-sm font-medium border border-gray-200">
            {categoryNames[article.category]}
          </span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-emerald-800 rounded-full text-sm font-medium border border-gray-200"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

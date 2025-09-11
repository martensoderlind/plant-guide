import { articlesService } from "../instance";
import { Article } from "../schema";
import ArticleCard from "@/features/articles/components/article-card";

export default async function ArticleContainer() {
  const articles = await articlesService.getAllPublishedArticles();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  );
}
